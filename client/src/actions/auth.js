import {
  db_createUser,
  db_createFullUser,
  db_userExists,
  db_authenticateFullUser,
  wp_authenticate
} from '../api/db';
import {
  kis_verifyUser
} from '../api/kis';
import { getCookie, setCookie, eraseCookie } from '../utils/helpers'
var jwt = require('jsonwebtoken')

export const INIT_USER_REQUEST = 'INIT_USER_REQUEST';
export const INIT_USER_SUCCESS = 'INIT_USER_SUCCESS';
export const INIT_USER_ERROR = 'INIT_USER_ERROR';
export const GET_USER = 'GET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

const initUserRequest = { type: INIT_USER_REQUEST };
const initUserSuccess = (userData) => ({ type: INIT_USER_SUCCESS, userData });
const initUserError = error => ({ type: INIT_USER_ERROR, error });

export const initUser = (username, password) => async dispatch => {
  dispatch(initUserRequest);
  try {

    const response = await wp_authenticate(username, password)
    let userData

    if (response.success) {
      const userInfo = jwt.decode(response.data.jwt)

      if (userInfo.roles.includes("ucat_content_subscriber")) {

        const userExists = await db_userExists(userInfo.username)

        if (userExists == "") {
          userData = await db_createUser(userInfo.username, userInfo.display_name, userInfo.roles)
        } else {
          userData = userExists
        }

        const token = jwt.sign(userData, 'secret')
        setCookie("jwt", token, 1)

        dispatch(initUserSuccess(userData))
      } else {
        dispatch(initUserError("You have not purchased the UCAT plan."));
      }
    }
  } catch (error) {
    dispatch(initUserError("Wrong credentials. Try again."));
  }
};

export const INIT_GENERAL_USER_REQUEST = 'INIT_GENERAL_USER_REQUEST';
export const INIT_GENERAL_USER_SUCCESS = 'INIT_GENERAL_USER_SUCCESS';
export const INIT_GENERAL_USER_ERROR = 'INIT_GENERAL_USER_ERROR';

const initGeneralUserRequest = { type: INIT_GENERAL_USER_REQUEST };
const initGeneralUserSuccess = (userData) => ({ type: INIT_GENERAL_USER_SUCCESS, userData });
const initGeneralUserError = error => ({ type: INIT_GENERAL_USER_ERROR, error });

export const initGeneralUser = (email, password, type) => async dispatch => {
  dispatch(initGeneralUserRequest);
  try {

    const userData = await kis_verifyUser("email", email)
    let db_userData

    // If user exists
    if (userData.user && userData.enrolment) {

      // If user is not expired
      if (!userData.enrolment.expired) {

        const userExists = await db_userExists(userData.user.email)

        // If user doesn't already exist in MY db
        if (userExists == "") {
          db_userData = await db_createFullUser(userData.user.email, userData.user.full_name, password, type, userData.user.id)

          // Set cookie
          delete db_userData.password
          const token = jwt.sign(db_userData, 'secret')
          setCookie("jwt", token, 1)

          dispatch(initGeneralUserSuccess(db_userData))
        } else {
          dispatch(initGeneralUserError("You already exists in our database!"));
        }

      } else {
        dispatch(initGeneralUserError("Your access to the UCAT platform has expired."));
      }
    } else {
      dispatch(initGeneralUserError("This account does not exist on the KIS platform."));
    }
  } catch (error) {
    dispatch(initGeneralUserError("Failed. Unexpected error."));
  }
};

export const LOGIN_GENERAL_USER_REQUEST = 'LOGIN_GENERAL_USER_REQUEST';
export const LOGIN_GENERAL_USER_SUCCESS = 'LOGIN_GENERAL_USER_SUCCESS';
export const LOGIN_GENERAL_USER_ERROR = 'LOGIN_GENERAL_USER_ERROR';

const loginGeneralUserRequest = { type: LOGIN_GENERAL_USER_REQUEST };
const loginGeneralUserSuccess = (userData) => ({ type: LOGIN_GENERAL_USER_SUCCESS, userData });
const loginGeneralUserError = error => ({ type: LOGIN_GENERAL_USER_ERROR, error });

export const loginGeneralUser = (email, password) => async dispatch => {
  dispatch(loginGeneralUserRequest);
  try {
    const db_userData = await db_authenticateFullUser(email, password)

    if (!db_userData.error) {
      const kis_userData = await kis_verifyUser("email", email)

      // If user exists
      if (kis_userData.user && kis_userData.enrolment) {

        // If user is not expired
        if (!kis_userData.enrolment.expired) {

          // Set cookie
          delete db_userData.password
          const token = jwt.sign(db_userData, 'secret')
          setCookie("jwt", token, 1)

          dispatch(loginGeneralUserSuccess(db_userData))

        } else {
          dispatch(loginGeneralUserError("Your access to the UCAT platform has expired."));
        }
      } else {
        dispatch(loginGeneralUserError("This account does not exist on the KIS platform."));
      }
    } else {
      dispatch(loginGeneralUserError("Wrong credentials."));
    }

  } catch (error) {
    dispatch(loginGeneralUserError("Failed. Unexpected error."));
  }
};

export const getUser = () => {
  const userData = jwt.decode(getCookie("jwt"))

  return {
    type: GET_USER,
    userData
  }
}

export const logoutUser = () => {
  eraseCookie("jwt")

  return {
    type: LOGOUT_USER
  }
}



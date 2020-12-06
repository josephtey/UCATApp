import {
  db_createUser,
  db_userExists,
  wp_authenticate
} from '../api/db';
import { getCookie, setCookie, eraseCookie } from '../utils/helpers'
var jwt = require('jsonwebtoken')

export const INIT_USER_REQUEST = 'INIT_USER_REQUEST';
export const INIT_USER_SUCCESS = 'INIT_USER_SUCCESS';
export const INIT_USER_ERROR = 'INIT_USER_ERROR';
export const GET_USER = 'GET_USER';

const initUserRequest = { type: INIT_USER_REQUEST };
const initUserSuccess = (userData) => ({ type: INIT_USER_SUCCESS, userData });
const initUserError = error => ({ type: INIT_USER_ERROR, error });

export const initUser = (username, password) => async dispatch => {
  dispatch(initUserRequest);
  try {

    const response = await wp_authenticate(username, password)
    let userData

    if (response.success) {
      const token = response.data.jwt
      setCookie("jwt", token, 1)

      const userExists = await db_userExists(username)
      if (userExists == "") {
        userData = await db_createUser(username)
      } else {
        userData = userExists
      }
    }

    dispatch(initUserSuccess(userData))

  } catch (error) {
    dispatch(initUserError(error));
  }
};

export const getUser = () => {
  const userData = jwt.decode(getCookie("jwt"))

  return {
    type: GET_USER,
    userData
  }
}


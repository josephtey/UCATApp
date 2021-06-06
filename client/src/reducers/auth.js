import {
  INIT_USER_REQUEST,
  INIT_USER_SUCCESS,
  INIT_USER_ERROR,

  GET_USER,

  LOGOUT_USER,

  INIT_GENERAL_USER_REQUEST,
  INIT_GENERAL_USER_SUCCESS,
  INIT_GENERAL_USER_ERROR,

  LOGIN_GENERAL_USER_REQUEST,
  LOGIN_GENERAL_USER_SUCCESS,
  LOGIN_GENERAL_USER_ERROR,
} from '../actions/auth'

const initialState = {
  userData: null,
  isCreatingUser: false,
  isLoggingIn: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_USER_REQUEST:
      return { ...state, isCreatingUser: true }
    case INIT_USER_SUCCESS:
      return { ...state, isCreatingUser: false, userData: action.userData }
    case INIT_USER_ERROR:
      return { ...state, isCreatingUser: false, error: action.error }

    case INIT_GENERAL_USER_REQUEST:
      return { ...state, isCreatingUser: true }
    case INIT_GENERAL_USER_SUCCESS:
      return { ...state, isCreatingUser: false, userData: action.userData }
    case INIT_GENERAL_USER_ERROR:
      return { ...state, isCreatingUser: false, error: action.error }

    case LOGIN_GENERAL_USER_REQUEST:
      return { ...state, isLoggingIn: true }
    case LOGIN_GENERAL_USER_SUCCESS:
      return { ...state, isLoggingIn: false, userData: action.userData }
    case LOGIN_GENERAL_USER_ERROR:
      return { ...state, isLoggingIn: false, error: action.error }

    case GET_USER:
      return { ...state, userData: action.userData }

    case LOGOUT_USER:
      return { ...state, userData: null, error: null }

    default:
      return state
  }
}
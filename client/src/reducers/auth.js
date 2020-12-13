import {
  INIT_USER_REQUEST,
  INIT_USER_SUCCESS,
  INIT_USER_ERROR,

  GET_USER,

  LOGOUT_USER
} from '../actions/auth'

const initialState = {
  userData: null,
  isCreatingUser: false,
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

    case GET_USER:
      return { ...state, userData: action.userData }

    case LOGOUT_USER:
      return { ...state, userData: null, error: null }

    default:
      return state
  }
}
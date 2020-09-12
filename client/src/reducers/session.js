import {
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_ERROR,
  GET_SESSION_RESPONSES_REQUEST,
  GET_SESSION_RESPONSES_SUCCESS,
  GET_SESSION_RESPONSES_ERROR,
  CREATE_RESPONSE_REQUEST,
  CREATE_RESPONSE_SUCCESS,
  CREATE_RESPONSE_ERROR,

} from '../actions/session'

const initialState = {
  isCreatingSession: false,
  isFetchingResponses: false,
  isCreatingResponse: false,
  error: null,
  currentSession: null,
  sessionResponses: [],
  newResponse: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SESSION_REQUEST:
      return { ...state, isCreatingSession: true }
    case CREATE_SESSION_SUCCESS:
      return { ...state, isCreatingSession: false, currentSession: action.currentSession }
    case CREATE_SESSION_ERROR:
      return { ...state, isCreatingSession: false, error: action.error }

    case GET_SESSION_RESPONSES_REQUEST:
      return { ...state, isFetchingResponses: true }
    case GET_SESSION_RESPONSES_SUCCESS:
      return { ...state, isFetchingResponses: false, sessionResponses: action.sessionResponses }
    case GET_SESSION_RESPONSES_ERROR:
      return { ...state, isFetchingResponses: false, error: action.error }

    case CREATE_RESPONSE_REQUEST:
      return { ...state, isCreatingResponse: true }
    case CREATE_RESPONSE_SUCCESS:
      return { ...state, isCreatingResponse: false, newResponse: action.newResponse }
    case CREATE_RESPONSE_ERROR:
      return { ...state, isCreatingResponse: false, error: action.error }
    default:
      return state
  }
}
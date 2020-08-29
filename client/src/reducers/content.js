import {
  GET_ALL_EXAMS_REQUEST,
  GET_ALL_EXAMS_SUCCESS,
  GET_ALL_EXAMS_ERROR,
  GET_EXAM_DETAIL_REQUEST,
  GET_EXAM_DETAIL_SUCCESS,
  GET_EXAM_DETAIL_ERROR,
  RESET_EXAM_DETAIL,
  GET_SECTION_DETAIL_REQUEST,
  GET_SECTION_DETAIL_SUCCESS,
  GET_SECTION_DETAIL_ERROR,
  RESET_SECTION_DETAIL,
  GET_QUESTION_DETAIL_REQUEST,
  GET_QUESTION_DETAIL_SUCCESS,
  GET_QUESTION_DETAIL_ERROR,
  RESET_QUESTION_DETAIL,
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_ERROR,
  GET_STRUCTURE_SESSIONS_REQUEST,
  GET_STRUCTURE_SESSIONS_SUCCESS,
  GET_STRUCTURE_SESSIONS_ERROR,
  GET_SESSION_RESPONSES_REQUEST,
  GET_SESSION_RESPONSES_SUCCESS,
  GET_SESSION_RESPONSES_ERROR,
  CREATE_RESPONSE_REQUEST,
  CREATE_RESPONSE_SUCCESS,
  CREATE_RESPONSE_ERROR,

} from '../actions/content'

const initialState = {
  isLoading: false,
  error: null,
  allExams: [],
  examDetail: null,
  sectionDetail: null,
  questionDetail: null,
  currentSession: null,
  sessionResponses: [],
  structureSessions: [],
  newResponse: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EXAMS_REQUEST:
      return { ...state, isLoading: true }
    case GET_ALL_EXAMS_SUCCESS:
      return { ...state, isLoading: false, allExams: action.allExams }
    case GET_ALL_EXAMS_ERROR:
      return { ...state, isLoading: false, error: action.error }
    case GET_EXAM_DETAIL_REQUEST:
      return { ...state, isLoading: true }
    case GET_EXAM_DETAIL_SUCCESS:
      return { ...state, isLoading: false, examDetail: action.examDetail }
    case GET_EXAM_DETAIL_ERROR:
      return { ...state, isLoading: false, error: action.error }
    case RESET_EXAM_DETAIL:
      return { ...state, examDetail: null }
    case GET_SECTION_DETAIL_REQUEST:
      return { ...state, isLoading: true }
    case GET_SECTION_DETAIL_SUCCESS:
      return { ...state, isLoading: false, sectionDetail: action.sectionDetail }
    case GET_SECTION_DETAIL_ERROR:
      return { ...state, isLoading: false, error: action.error }
    case RESET_SECTION_DETAIL:
      return { ...state, sectionDetail: null }
    case GET_QUESTION_DETAIL_REQUEST:
      return { ...state, isLoading: true }
    case GET_QUESTION_DETAIL_SUCCESS:
      return { ...state, isLoading: false, questionDetail: action.questionDetail }
    case GET_QUESTION_DETAIL_ERROR:
      return { ...state, isLoading: false, error: action.error }
    case RESET_QUESTION_DETAIL:
      return { ...state, questionDetail: null }
    case CREATE_SESSION_REQUEST:
      return { ...state, isLoading: true }
    case CREATE_SESSION_SUCCESS:
      return { ...state, isLoading: false, currentSession: action.currentSession }
    case CREATE_SESSION_ERROR:
      return { ...state, isLoading: false, error: action.error }
    case GET_STRUCTURE_SESSIONS_REQUEST:
      return { ...state, isLoading: true }
    case GET_STRUCTURE_SESSIONS_SUCCESS:
      return { ...state, isLoading: false, structureSessions: action.structureSessions }
    case GET_STRUCTURE_SESSIONS_ERROR:
      return { ...state, isLoading: false, error: action.error }
    case GET_SESSION_RESPONSES_REQUEST:
      return { ...state, isLoading: true }
    case GET_SESSION_RESPONSES_SUCCESS:
      return { ...state, isLoading: false, sessionResponses: action.sessionResponses }
    case GET_SESSION_RESPONSES_ERROR:
      return { ...state, isLoading: false, error: action.error }
    case CREATE_RESPONSE_REQUEST:
      return { ...state, isLoading: true }
    case CREATE_RESPONSE_SUCCESS:
      return { ...state, isLoading: false, newResponse: action.newResponse }
    case CREATE_RESPONSE_ERROR:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}
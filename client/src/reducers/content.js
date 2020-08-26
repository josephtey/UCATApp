import {
  GET_ALL_EXAMS_REQUEST,
  GET_ALL_EXAMS_SUCCESS,
  GET_ALL_EXAMS_ERROR,
  GET_EXAM_DETAIL_REQUEST,
  GET_EXAM_DETAIL_SUCCESS,
  GET_EXAM_DETAIL_ERROR,
  RESET_EXAM_DETAIL
} from '../actions/content'

const initialState = {
  isLoading: false,
  error: null,
  allExams: [],
  examDetail: null
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
    default:
      return state
  }
}
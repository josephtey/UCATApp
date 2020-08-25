import {
  GET_ALL_EXAMS_REQUEST,
  GET_ALL_EXAMS_SUCCESS,
  GET_ALL_EXAMS_ERROR,
} from '../actions/content'

const initialState = {
  isLoading: false,
  error: null,
  allExams: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EXAMS_REQUEST:
      return { ...state, isLoading: true }
    case GET_ALL_EXAMS_SUCCESS:
      return { ...state, isLoading: false, allExams: action.allExams }
    case GET_ALL_EXAMS_ERROR:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state
  }
}
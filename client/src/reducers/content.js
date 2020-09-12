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

  GET_STRUCTURE_SESSIONS_REQUEST,
  GET_STRUCTURE_SESSIONS_SUCCESS,
  GET_STRUCTURE_SESSIONS_ERROR,

} from '../actions/content'

const initialState = {
  isFetchingExams: false,
  isFetchingExamDetail: false,
  isFetchingSectionDetail: false,
  isFetchingQuestionDetail: false,
  isFetchingSessions: false,
  error: null,
  allExams: [],
  examDetail: null,
  sectionDetail: null,
  questionDetail: null,
  structureSessions: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EXAMS_REQUEST:
      return { ...state, isFetchingExams: true }
    case GET_ALL_EXAMS_SUCCESS:
      return { ...state, isFetchingExams: false, allExams: action.allExams }
    case GET_ALL_EXAMS_ERROR:
      return { ...state, isFetchingExams: false, error: action.error }

    case GET_EXAM_DETAIL_REQUEST:
      return { ...state, isFetchingExamDetail: true }
    case GET_EXAM_DETAIL_SUCCESS:
      return { ...state, isFetchingExamDetail: false, examDetail: action.examDetail }
    case GET_EXAM_DETAIL_ERROR:
      return { ...state, isFetchingExamDetail: false, error: action.error }
    case RESET_EXAM_DETAIL:
      return { ...state, examDetail: null }

    case GET_SECTION_DETAIL_REQUEST:
      return { ...state, isFetchingSectionDetail: true }
    case GET_SECTION_DETAIL_SUCCESS:
      return { ...state, isFetchingSectionDetail: false, sectionDetail: action.sectionDetail }
    case GET_SECTION_DETAIL_ERROR:
      return { ...state, isFetchingSectionDetail: false, error: action.error }
    case RESET_SECTION_DETAIL:
      return { ...state, sectionDetail: null }

    case GET_QUESTION_DETAIL_REQUEST:
      return { ...state, isFetchingQuestionDetail: true }
    case GET_QUESTION_DETAIL_SUCCESS:
      return { ...state, isFetchingQuestionDetail: false, questionDetail: action.questionDetail }
    case GET_QUESTION_DETAIL_ERROR:
      return { ...state, isFetchingQuestionDetail: false, error: action.error }
    case RESET_QUESTION_DETAIL:
      return { ...state, questionDetail: null }

    case GET_STRUCTURE_SESSIONS_REQUEST:
      return { ...state, isFetchingSessions: true }
    case GET_STRUCTURE_SESSIONS_SUCCESS:
      return { ...state, isFetchingSessions: false, structureSessions: action.structureSessions }
    case GET_STRUCTURE_SESSIONS_ERROR:
      return { ...state, isFetchingSessions: false, error: action.error }
    default:
      return state
  }
}
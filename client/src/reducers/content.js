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

  GET_STRUCTURE_SESSIONS_REQUEST,
  GET_STRUCTURE_SESSIONS_SUCCESS,
  GET_STRUCTURE_SESSIONS_ERROR,

  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,

  GET_CATEGORY_DETAIL_REQUEST,
  GET_CATEGORY_DETAIL_SUCCESS,
  GET_CATEGORY_DETAIL_ERROR,
  RESET_CATEGORY_DETAIL,

} from '../actions/content'

const initialState = {
  isFetchingExams: false,
  isFetchingExamDetail: false,
  isFetchingSectionDetail: false,
  isFetchingQuestionDetail: false,
  isFetchingSessions: false,
  isFetchingCategories: false,
  error: null,
  allExams: [],
  examDetail: null,
  sectionDetail: null,
  structureSessions: [],
  categories: [],
  categoryDetail: null
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

    case GET_STRUCTURE_SESSIONS_REQUEST:
      return { ...state, isFetchingSessions: true }
    case GET_STRUCTURE_SESSIONS_SUCCESS:
      return { ...state, isFetchingSessions: false, structureSessions: action.structureSessions }
    case GET_STRUCTURE_SESSIONS_ERROR:
      return { ...state, isFetchingSessions: false, error: action.error }

    case GET_CATEGORIES_REQUEST:
      return { ...state, isFetchingCategories: true }
    case GET_CATEGORIES_SUCCESS:
      return { ...state, isFetchingCategories: false, categories: action.categories }
    case GET_CATEGORIES_ERROR:
      return { ...state, isFetchingCategories: false, error: action.error }
    case RESET_CATEGORY_DETAIL:
      return { ...state, categoryDetail: null }

    case GET_CATEGORY_DETAIL_REQUEST:
      return { ...state, isFetchingCategoryDetail: true }
    case GET_CATEGORY_DETAIL_SUCCESS:
      return { ...state, isFetchingCategoryDetail: false, categoryDetail: action.categoryDetail }
    case GET_CATEGORY_DETAIL_ERROR:
      return { ...state, isFetchingCategoryDetail: false, error: action.error }

    default:
      return state
  }
}
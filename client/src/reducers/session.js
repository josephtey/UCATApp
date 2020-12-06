import {
  CREATE_SESSION_REQUEST,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_ERROR,

  GET_SESSION_RESPONSES_REQUEST,
  GET_SESSION_RESPONSES_SUCCESS,
  GET_SESSION_RESPONSES_ERROR,
  RESET_SESSION_RESPONSES,

  CREATE_RESPONSE_REQUEST,
  CREATE_RESPONSE_SUCCESS,
  CREATE_RESPONSE_ERROR,

  GET_SESSION_DETAIL_REQUEST,
  GET_SESSION_DETAIL_SUCCESS,
  GET_SESSION_DETAIL_ERROR,
  RESET_SESSION_DETAIL,

  GET_SECTION_REQUEST,
  GET_SECTION_SUCCESS,
  GET_SECTION_ERROR,
  RESET_SECTION,

  GET_QUESTION_REQUEST,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_ERROR,

  NEXT_SECTION_REQUEST,
  NEXT_SECTION_SUCCESS,
  NEXT_SECTION_ERROR,

  FINISH_SESSION_REQUEST,
  FINISH_SESSION_SUCCESS,
  FINISH_SESSION_ERROR,

  REVIEW_SECTION,
  STOP_REVIEW,

  STOP_SECTION_START_REQUEST,
  STOP_SECTION_START_SUCCESS,
  STOP_SECTION_START_ERROR,

  REVIEW_QUESTIONS_REQUEST,
  REVIEW_QUESTIONS_SUCCESS,
  REVIEW_QUESTIONS_ERROR,

  FLAG_RESPONSE_REQUEST,
  FLAG_RESPONSE_SUCCESS,
  FLAG_RESPONSE_ERROR,

  START_SECTION,
  CHANGE_MODE
} from '../actions/session'

const initialState = {
  isCreatingSession: false,
  isFetchingResponses: false,
  isCreatingResponse: false,
  isFetchingSession: false,
  isFetchingQuestionDetail: false,
  isFinishingSession: false,
  isUpdatingSession: false,
  isFlagging: false,
  mode: "question",
  error: null,
  currentSession: null,
  currentQuestion: null,
  currentStructure: null,
  currentSection: null,
  currentStem: null,
  sessionResponses: [],
  newResponse: null,
  allSections: [],
  currentQuestionOrder: []
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
    case RESET_SESSION_RESPONSES:
      return { ...state, sessionResponse: [] }

    case CREATE_RESPONSE_REQUEST:
      return { ...state, isCreatingResponse: true }
    case CREATE_RESPONSE_SUCCESS:
      return { ...state, isCreatingResponse: false, newResponse: action.newResponse }
    case CREATE_RESPONSE_ERROR:
      return { ...state, isCreatingResponse: false, error: action.error }

    case FLAG_RESPONSE_REQUEST:
      return { ...state, isFlagging: true }
    case FLAG_RESPONSE_SUCCESS:
      return { ...state, isFlagging: false, newResponse: action.newResponse }
    case FLAG_RESPONSE_ERROR:
      return { ...state, isFlagging: false, error: action.error }

    case GET_QUESTION_REQUEST:
      return { ...state, isFetchingQuestionDetail: true }
    case GET_QUESTION_SUCCESS:
      return { ...state, isFetchingQuestionDetail: false, currentQuestion: action.questionDetail, currentStem: action.currentStem, mode: action.mode }
    case GET_QUESTION_ERROR:
      return { ...state, isFetchingQuestionDetail: false, error: action.error }

    case GET_SESSION_DETAIL_REQUEST:
      return { ...state, isFetchingSession: true }
    case GET_SESSION_DETAIL_SUCCESS:
      return { ...state, isFetchingSession: false, mode: action.mode, currentSession: action.sessionDetails, sessionResponses: action.sessionResponses, currentStructure: action.currentStructure, currentSection: action.currentSection, currentQuestionOrder: action.currentQuestionOrder, currentQuestion: action.currentQuestion, allSections: action.allSections, currentStem: action.currentStem }
    case GET_SESSION_DETAIL_ERROR:
      return { ...state, isFetchingSession: false, error: action.error }
    case RESET_SESSION_DETAIL:
      return { ...state, sessionResponses: [], currentSession: null, currentStructure: null, currentSection: null, currentQuestion: null, finishedSession: null, mode: "question" }

    case NEXT_SECTION_REQUEST:
      return { ...state, isFetchingSession: true }
    case NEXT_SECTION_SUCCESS:
      return { ...state, isFetchingSession: false, mode: "start", sessionResponses: action.sessionResponses, currentSection: action.currentSection, currentQuestionOrder: action.currentSection.question_order, currentQuestion: action.currentQuestion, currentSession: action.updatedSession }
    case NEXT_SECTION_ERROR:
      return { ...state, isFetchingSession: false, error: action.error }

    case GET_SECTION_REQUEST:
      return { ...state, isFetchingSession: true }
    case GET_SECTION_SUCCESS:
      return { ...state, isFetchingSession: false, currentSection: action.currentSection, currentQuestionOrder: action.currentQuestionOrder, currentQuestion: action.currentQuestion, mode: action.mode }
    case GET_SECTION_ERROR:
      return { ...state, isFetchingSession: false, error: action.error }
    case RESET_SECTION:
      return { ...state, currentSection: null, currentQuestionOrder: null }

    case FINISH_SESSION_REQUEST:
      return { ...state, isFinishingSession: true }
    case FINISH_SESSION_SUCCESS:
      return { ...state, isFinishingSession: false, mode: "results", currentSession: action.finishedSession }
    case FINISH_SESSION_ERROR:
      return { ...state, isFinishingSession: false, error: action.error }

    case REVIEW_SECTION:
      return { ...state, mode: "review" }
    case STOP_REVIEW:
      return { ...state, mode: "question" }

    case STOP_SECTION_START_REQUEST:
      return { ...state, isUpdatingSession: true }
    case STOP_SECTION_START_SUCCESS:
      return { ...state, isUpdatingSession: false, mode: "question", currentSession: action.updatedSession }
    case STOP_SECTION_START_ERROR:
      return { ...state, isUpdatingSession: false, error: action.error }

    case REVIEW_QUESTIONS_REQUEST:
      return { ...state, isFetchingSession: true }
    case REVIEW_QUESTIONS_SUCCESS:
      return { ...state, isFetchingSession: false, currentQuestionOrder: action.updatedQuestionOrder }
    case REVIEW_QUESTIONS_ERROR:
      return { ...state, isFetchingSession: false, error: action.error }

    case START_SECTION:
      return { ...state, mode: "start" }

    case CHANGE_MODE:
      return { ...state, mode: action.mode }

    default:
      return state
  }
}
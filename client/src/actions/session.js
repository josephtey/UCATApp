import {
  db_createSession,
  db_getAllSectionResponses,
  db_getAllSessionResponses,
  db_createResponse,
  db_findSession,
  db_getSectionDetail,
  db_getExamDetail,
  db_getQuestionDetail,
  db_findResponse,
  db_updateResponse,
  db_updateSession,
  db_updateSessionTime,
  db_flagResponse,
  db_createBareResponse
} from '../api/db';

export const CREATE_RESPONSE_REQUEST = 'CREATE_RESPONSE_REQUEST';
export const CREATE_RESPONSE_SUCCESS = 'CREATE_RESPONSE_SUCCESS';
export const CREATE_RESPONSE_ERROR = 'CREATE_RESPONSE_ERROR';

const createResponseRequest = { type: CREATE_RESPONSE_REQUEST };
const createResponseSuccess = (newResponse) => ({ type: CREATE_RESPONSE_SUCCESS, newResponse });
const createResponseError = error => ({ type: CREATE_RESPONSE_ERROR, error });

export const createResponse = (session_id, question_id, student_id, section_id, value, answer) => async dispatch => {
  dispatch(createResponseRequest);
  try {

    const response = await db_findResponse(session_id, question_id)
    const correct = value === answer ? true : false

    let newResponse;
    if (response) {
      newResponse = await db_updateResponse(response.response_id, value, correct)
    } else {
      newResponse = await db_createResponse(session_id, question_id, student_id, section_id, value, correct, false)
    }

    dispatch(createResponseSuccess(newResponse))

  } catch (error) {
    dispatch(createResponseError(error));
  }
};

export const FLAG_RESPONSE_REQUEST = 'FLAG_RESPONSE_REQUEST';
export const FLAG_RESPONSE_SUCCESS = 'FLAG_RESPONSE_SUCCESS';
export const FLAG_RESPONSE_ERROR = 'FLAG_RESPONSE_ERROR';

const flagResponseRequest = { type: FLAG_RESPONSE_REQUEST };
const flagResponseSuccess = (newResponse) => ({ type: FLAG_RESPONSE_SUCCESS, newResponse });
const flagResponseError = error => ({ type: FLAG_RESPONSE_ERROR, error });

export const flagResponse = (session_id, question_id, student_id, section_id, flagged) => async dispatch => {
  dispatch(flagResponseRequest);
  try {

    const response = await db_findResponse(session_id, question_id)

    let newResponse;
    if (response) {
      newResponse = await db_flagResponse(response.response_id, flagged)
    } else {
      newResponse = await db_createBareResponse(session_id, question_id, student_id, section_id, flagged)
    }

    dispatch(flagResponseSuccess(newResponse))

  } catch (error) {
    dispatch(flagResponseError(error));
  }
};



export const GET_SESSION_DETAIL_REQUEST = 'GET_SESSION_DETAIL_REQUEST';
export const GET_SESSION_DETAIL_SUCCESS = 'GET_SESSION_DETAIL_SUCCESS';
export const GET_SESSION_DETAIL_ERROR = 'GET_SESSION_DETAIL_ERROR';
export const RESET_SESSION_DETAIL = 'RESET_SESSION_DETAIL';

const getSessionDetailsRequest = { type: GET_SESSION_DETAIL_REQUEST };
const getSessionDetailsSuccess = (sessionDetails, sessionResponses, currentSection, currentStructure, currentQuestion, mode, allSections) => ({ type: GET_SESSION_DETAIL_SUCCESS, sessionDetails, sessionResponses, currentSection, currentStructure, currentQuestion, mode, allSections });
const getSessionDetailsError = error => ({ type: GET_SESSION_DETAIL_ERROR, error });

export const getSessionDetails = (session_id) => async dispatch => {
  dispatch(getSessionDetailsRequest);
  try {
    const sessionDetails = await db_findSession(session_id)
    const currentStructure = await db_getExamDetail(sessionDetails.structure_id)

    let currentSection, currentQuestion, mode, sessionResponses;


    if (sessionDetails.completed === true) {

      // Results mode
      mode = "results"
      sessionResponses = await db_getAllSessionResponses(session_id)

    } else if (sessionDetails.start_time.length > 0) {

      // Resuming progress
      currentSection = currentStructure.sections.find(item => item.section_id === currentStructure.details.section_order[sessionDetails.end_time.length])
      sessionResponses = await db_getAllSectionResponses(sessionDetails.session_id, currentSection.section_id)

      if (sessionResponses.length > 0) {
        if (sessionResponses[0].question_id == currentSection.question_order.slice(-1)[0]) {
          currentQuestion = await db_getQuestionDetail(sessionResponses[0].question_id)
        } else {
          const currentIndex = currentSection.question_order.indexOf(sessionResponses[0].question_id)
          currentQuestion = await db_getQuestionDetail(currentSection.question_order[currentIndex + 1])
        }

        mode = "question"
      } else {
        currentQuestion = await db_getQuestionDetail(currentSection.question_order[0])

        if (sessionDetails.start_time.length == sessionDetails.end_time.length) {
          mode = "start"
        } else {
          mode = "question"
        }
      }

    } else {

      // Starting a new session!
      currentSection = currentStructure.sections[0]
      sessionResponses = await db_getAllSectionResponses(sessionDetails.session_id, currentSection.section_id)
      currentQuestion = await db_getQuestionDetail(currentSection.question_order[0])
      mode = "start"

    }

    dispatch(getSessionDetailsSuccess(sessionDetails, sessionResponses, currentSection, currentStructure.details, currentQuestion, mode, currentStructure.sections))

  } catch (error) {
    dispatch(getSessionDetailsError(error));
  }
};

export const resetSessionDetail = () => {
  return {
    type: RESET_SESSION_DETAIL
  }
}

export const NEXT_SECTION_REQUEST = 'NEXT_SECTION_REQUEST';
export const NEXT_SECTION_SUCCESS = 'NEXT_SECTION_SUCCESS';
export const NEXT_SECTION_ERROR = 'NEXT_SECTION_ERROR';

const nextSectionRequest = { type: NEXT_SECTION_REQUEST };
const nextSectionSuccess = (sessionResponses, currentSection, currentQuestion, updatedSession) => ({ type: NEXT_SECTION_SUCCESS, sessionResponses, currentSection, currentQuestion, updatedSession });
const nextSectionError = error => ({ type: NEXT_SECTION_ERROR, error });

export const nextSection = (session_id, section_id) => async dispatch => {
  dispatch(nextSectionRequest);
  try {
    const sessionResponses = await db_getAllSectionResponses(session_id, section_id)
    const currentSection = await db_getSectionDetail(section_id)
    const currentQuestion = await db_getQuestionDetail(currentSection.details.question_order[0])
    const updatedSession = await db_updateSessionTime(session_id, "end")

    dispatch(nextSectionSuccess(sessionResponses, currentSection.details, currentQuestion, updatedSession))

  } catch (error) {
    dispatch(nextSectionError(error));
  }
};

export const GET_SESSION_RESPONSES_REQUEST = 'GET_SESSION_RESPONSES_REQUEST';
export const GET_SESSION_RESPONSES_SUCCESS = 'GET_SESSION_RESPONSES_SUCCESS';
export const GET_SESSION_RESPONSES_ERROR = 'GET_SESSION_RESPONSES_ERROR';
export const RESET_SESSION_RESPONSES = 'RESET_SESSION_RESPONSES';

const getSessionResponsesRequest = { type: GET_SESSION_RESPONSES_REQUEST };
const getSessionResponsesSuccess = (sessionResponses) => ({ type: GET_SESSION_RESPONSES_SUCCESS, sessionResponses });
const getSessionResponsesError = error => ({ type: GET_SESSION_RESPONSES_ERROR, error });

export const getSessionResponses = (session_id, type, group_id) => async dispatch => {
  dispatch(getSessionResponsesRequest);
  try {
    let responses
    if (type === "section") {
      responses = await db_getAllSectionResponses(session_id, group_id)
    } else if (type === "structure") {
      responses = await db_getAllSessionResponses(session_id)
    }

    dispatch(getSessionResponsesSuccess(responses))

  } catch (error) {
    dispatch(getSessionResponsesError(error));
  }
};

export const resetSessionResponses = () => {
  return { type: RESET_SESSION_RESPONSES }
}

export const CREATE_SESSION_REQUEST = 'CREATE_SESSION_REQUEST';
export const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS';
export const CREATE_SESSION_ERROR = 'CREATE_SESSION_ERROR';

const createSessionRequest = { type: CREATE_SESSION_REQUEST };
const createSessionSuccess = (currentSession) => ({ type: CREATE_SESSION_SUCCESS, currentSession });
const createSessionError = error => ({ type: CREATE_SESSION_ERROR, error });

export const createSession = (structure_id, student_id) => async dispatch => {
  dispatch(createSessionRequest);
  try {
    const currentSession = await db_createSession(structure_id, student_id)
    dispatch(createSessionSuccess(currentSession))

  } catch (error) {
    dispatch(createSessionError(error));
  }
};

export const GET_QUESTION_REQUEST = 'GET_QUESTION_REQUEST';
export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const GET_QUESTION_ERROR = 'GET_QUESTION_ERROR';

const getQuestionDetailRequest = { type: GET_QUESTION_REQUEST };
const getQuestionDetailSuccess = (questionDetail) => ({ type: GET_QUESTION_SUCCESS, questionDetail });
const getQuestionDetailError = error => ({ type: GET_QUESTION_ERROR, error });

export const getQuestionDetail = (question_id) => async dispatch => {
  dispatch(getQuestionDetailRequest);
  try {
    const questionDetail = await db_getQuestionDetail(question_id)
    dispatch(getQuestionDetailSuccess(questionDetail))

  } catch (error) {
    dispatch(getQuestionDetailError(error));
  }
};

export const REVIEW_SECTION = 'REVIEW_SECTION';
export const reviewSection = () => {
  return { type: REVIEW_SECTION };
}

export const STOP_REVIEW = 'STOP_REVIEW';
export const stopReview = () => {
  return { type: STOP_REVIEW };
}

export const START_SECTION = 'START_SECTION';
export const startSection = () => {
  return { type: START_SECTION };
}

export const STOP_SECTION_START_REQUEST = 'STOP_SECTION_START_REQUEST';
export const STOP_SECTION_START_SUCCESS = 'STOP_SECTION_START_SUCCESS';
export const STOP_SECTION_START_ERROR = 'STOP_SECTION_START_ERROR';

const stopSectionStartRequest = { type: STOP_SECTION_START_REQUEST };
const stopSectionStartSuccess = (updatedSession) => ({ type: STOP_SECTION_START_SUCCESS, updatedSession });
const stopSectionStartError = error => ({ type: STOP_SECTION_START_ERROR, error });

export const stopSectionStart = (session_id) => async dispatch => {
  dispatch(stopSectionStartRequest);
  try {
    const updatedSession = await db_updateSessionTime(session_id, "start")
    dispatch(stopSectionStartSuccess(updatedSession))

  } catch (error) {
    dispatch(stopSectionStartError(error));
  }
};

export const FINISH_SESSION_REQUEST = 'FINISH_SESSION_REQUEST';
export const FINISH_SESSION_SUCCESS = 'FINISH_SESSION_SUCCESS';
export const FINISH_SESSION_ERROR = 'FINISH_SESSION_ERROR';

const finishSessionRequest = { type: FINISH_SESSION_REQUEST };
const finishSessionSuccess = (finishedSession) => ({ type: FINISH_SESSION_SUCCESS, finishedSession });
const finishSessionError = error => ({ type: FINISH_SESSION_ERROR, error });

export const finishSession = (session_id) => async dispatch => {
  dispatch(finishSessionRequest);
  try {
    await db_updateSessionTime(session_id, "end")
    const finishedSession = await db_updateSession(session_id, {
      completed: true,
      score: 50
    })
    dispatch(finishSessionSuccess(finishedSession))

  } catch (error) {
    dispatch(finishSessionError(error));
  }
};


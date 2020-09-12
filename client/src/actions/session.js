import {
  db_createSession,
  db_getAllSectionResponses,
  db_getAllSessionResponses,
  db_createResponse,
  db_findSession
} from '../api/db';

export const CREATE_RESPONSE_REQUEST = 'CREATE_RESPONSE_REQUEST';
export const CREATE_RESPONSE_SUCCESS = 'CREATE_RESPONSE_SUCCESS';
export const CREATE_RESPONSE_ERROR = 'CREATE_RESPONSE_ERROR';

const createResponseRequest = { type: CREATE_RESPONSE_REQUEST };
const createResponseSuccess = (newResponse) => ({ type: CREATE_RESPONSE_SUCCESS, newResponse });
const createResponseError = error => ({ type: CREATE_RESPONSE_ERROR, error });

export const createResponse = (session_id, question_id, student_id, section_id, value) => async dispatch => {
  dispatch(createResponseRequest);
  try {
    const newResponse = await db_createResponse(session_id, question_id, student_id, section_id, value)
    dispatch(createResponseSuccess(newResponse))

  } catch (error) {
    dispatch(createResponseError(error));
  }
};

export const GET_SESSION_DETAIL_REQUEST = 'GET_SESSION_DETAIL_REQUEST';
export const GET_SESSION_DETAIL_SUCCESS = 'GET_SESSION_DETAIL_SUCCESS';
export const GET_SESSION_DETAIL_ERROR = 'GET_SESSION_DETAIL_ERROR';
export const RESET_SESSION_DETAIL = 'RESET_SESSION_DETAIL';

const getSessionDetailsRequest = { type: GET_SESSION_DETAIL_REQUEST };
const getSessionDetailsSuccess = (sessionDetails, sessionResponses) => ({ type: GET_SESSION_DETAIL_SUCCESS, sessionDetails, sessionResponses });
const getSessionDetailsError = error => ({ type: GET_SESSION_DETAIL_ERROR, error });

export const getSessionDetails = (session_id) => async dispatch => {
  dispatch(getSessionDetailsRequest);
  try {
    const sessionDetails = await db_findSession(session_id)
    const sessionResponses = await db_getAllSessionResponses(session_id)

    dispatch(getSessionDetailsSuccess(sessionDetails, sessionResponses))

  } catch (error) {
    dispatch(getSessionDetailsError(error));
  }
};

export const resetSessionDetail = () => {
  return {
    type: RESET_SESSION_DETAIL
  }
}


export const GET_SESSION_RESPONSES_REQUEST = 'GET_SESSION_RESPONSES_REQUEST';
export const GET_SESSION_RESPONSES_SUCCESS = 'GET_SESSION_RESPONSES_SUCCESS';
export const GET_SESSION_RESPONSES_ERROR = 'GET_SESSION_RESPONSES_ERROR';

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

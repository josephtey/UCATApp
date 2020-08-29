import {
  db_getAllExams,
  db_getExamDetail,
  db_getSectionDetail,
  db_getQuestionDetail,
  db_createSession,
  db_getAllStructureSessions,
  db_getAllSectionResponses,
  db_getAllStructureResponses,
  db_createResponse
} from '../api/db';

export const GET_ALL_EXAMS_REQUEST = 'GET_ALL_EXAMS_REQUEST';
export const GET_ALL_EXAMS_SUCCESS = 'GET_ALL_EXAMS_SUCCESS';
export const GET_ALL_EXAMS_ERROR = 'GET_ALL_EXAMS_ERROR';

const getAllExamsRequest = { type: GET_ALL_EXAMS_REQUEST };
const getAllExamsSuccess = (allExams) => ({ type: GET_ALL_EXAMS_SUCCESS, allExams });
const getAllExamsError = error => ({ type: GET_ALL_EXAMS_ERROR, error });

export const getAllExams = () => async dispatch => {
  dispatch(getAllExamsRequest);
  try {
    const allExams = await db_getAllExams()
    dispatch(getAllExamsSuccess(allExams))

  } catch (error) {
    dispatch(getAllExamsError(error));
  }
};


export const GET_EXAM_DETAIL_REQUEST = 'GET_EXAM_DETAIL_REQUEST';
export const GET_EXAM_DETAIL_SUCCESS = 'GET_EXAM_DETAIL_SUCCESS';
export const GET_EXAM_DETAIL_ERROR = 'GET_EXAM_DETAIL_ERROR';
export const RESET_EXAM_DETAIL = 'RESET_EXAM_DETAIL';

const getExamDetailRequest = { type: GET_EXAM_DETAIL_REQUEST };
const getExamDetailSuccess = (examDetail) => ({ type: GET_EXAM_DETAIL_SUCCESS, examDetail });
const getExamDetailError = error => ({ type: GET_EXAM_DETAIL_ERROR, error });

export const getExamDetail = (structure_id) => async dispatch => {
  dispatch(getExamDetailRequest);
  try {
    const examDetail = await db_getExamDetail(structure_id)
    dispatch(getExamDetailSuccess(examDetail))

  } catch (error) {
    dispatch(getExamDetailError(error));
  }
};

export const resetExamDetail = () => {
  return {
    type: RESET_EXAM_DETAIL
  }
}

export const GET_SECTION_DETAIL_REQUEST = 'GET_SECTION_DETAIL_REQUEST';
export const GET_SECTION_DETAIL_SUCCESS = 'GET_SECTION_DETAIL_SUCCESS';
export const GET_SECTION_DETAIL_ERROR = 'GET_SECTION_DETAIL_ERROR';
export const RESET_SECTION_DETAIL = 'RESET_SECTION_DETAIL';

const getSectionDetailRequest = { type: GET_SECTION_DETAIL_REQUEST };
const getSectionDetailSuccess = (sectionDetail) => ({ type: GET_SECTION_DETAIL_SUCCESS, sectionDetail });
const getSectionDetailError = error => ({ type: GET_SECTION_DETAIL_ERROR, error });

export const getSectionDetail = (section_id) => async dispatch => {
  dispatch(getSectionDetailRequest);
  try {
    const sectionDetail = await db_getSectionDetail(section_id)
    dispatch(getSectionDetailSuccess(sectionDetail))

  } catch (error) {
    dispatch(getSectionDetailError(error));
  }
};

export const resetSectionDetail = () => {
  return {
    type: RESET_SECTION_DETAIL
  }
}

export const GET_QUESTION_DETAIL_REQUEST = 'GET_QUESTION_DETAIL_REQUEST';
export const GET_QUESTION_DETAIL_SUCCESS = 'GET_QUESTION_DETAIL_SUCCESS';
export const GET_QUESTION_DETAIL_ERROR = 'GET_QUESTION_DETAIL_ERROR';
export const RESET_QUESTION_DETAIL = 'RESET_QUESTION_DETAIL';

const getQuestionDetailRequest = { type: GET_QUESTION_DETAIL_REQUEST };
const getQuestionDetailSuccess = (questionDetail) => ({ type: GET_QUESTION_DETAIL_SUCCESS, questionDetail });
const getQuestionDetailError = error => ({ type: GET_QUESTION_DETAIL_ERROR, error });

export const getQuestionDetail = (question_id) => async dispatch => {
  dispatch(getQuestionDetailRequest);
  try {
    const questionDetail = await db_getQuestionDetail(question_id)
    dispatch(getQuestionDetailSuccess(questionDetail))

  } catch (error) {
    dispatch(getQuestionDetailError(error));
  }
};

export const resetQuestionDetail = () => {
  return {
    type: RESET_SECTION_DETAIL
  }
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
    const questionDetail = await db_createSession(structure_id, student_id)
    dispatch(createSessionSuccess(questionDetail))

  } catch (error) {
    dispatch(createSessionError(error));
  }
};


export const GET_STRUCTURE_SESSIONS_REQUEST = 'GET_STRUCTURE_SESSIONS_REQUEST';
export const GET_STRUCTURE_SESSIONS_SUCCESS = 'GET_STRUCTURE_SESSIONS_SUCCESS';
export const GET_STRUCTURE_SESSIONS_ERROR = 'GET_STRUCTURE_SESSIONS_ERROR';

const getStructureSessionsRequest = { type: GET_STRUCTURE_SESSIONS_REQUEST };
const getStructureSessionsSuccess = (structureSessions) => ({ type: GET_STRUCTURE_SESSIONS_SUCCESS, structureSessions });
const getStructureSessionsError = error => ({ type: GET_STRUCTURE_SESSIONS_ERROR, error });

export const getStructureSessions = (structure_id, student_id) => async dispatch => {
  dispatch(getStructureSessionsRequest);
  try {
    const sessions = await db_getAllStructureSessions(structure_id, student_id)
    dispatch(getStructureSessionsSuccess(sessions))

  } catch (error) {
    dispatch(getStructureSessionsError(error));
  }
};

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
      responses = await db_getAllStructureResponses(session_id, group_id)
    }

    dispatch(getSessionResponsesSuccess(responses))

  } catch (error) {
    dispatch(getSessionResponsesError(error));
  }
};

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
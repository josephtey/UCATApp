import {
  db_getAllExams,
  db_getExamDetail,
  db_getSectionDetail,
  db_getQuestionDetail,
  db_getAllStructureSessions,
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




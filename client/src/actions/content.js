import { db_getAllExams, db_getExamDetail } from '../api/db';

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
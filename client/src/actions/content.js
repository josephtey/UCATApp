import { db_getAllExams } from '../api/db';

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
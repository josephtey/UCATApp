import {
  db_getAllExams,
  db_getExamDetail,
  db_getSectionDetail,
  db_getAllStructureSessions,
  db_getCategories,
  db_getCategoryDetail,
  db_getCategorySessions,
  db_getCategoryQuestions,
  db_getCompletedQuestions,
  db_getAllStudents,
  db_getStudentStatistics
} from '../api/db';

export const GET_ALL_EXAMS_REQUEST = 'GET_ALL_EXAMS_REQUEST';
export const GET_ALL_EXAMS_SUCCESS = 'GET_ALL_EXAMS_SUCCESS';
export const GET_ALL_EXAMS_ERROR = 'GET_ALL_EXAMS_ERROR';

const getAllExamsRequest = { type: GET_ALL_EXAMS_REQUEST };
const getAllExamsSuccess = (allExams) => ({ type: GET_ALL_EXAMS_SUCCESS, allExams });
const getAllExamsError = error => ({ type: GET_ALL_EXAMS_ERROR, error });

export const getAllExams = (type) => async dispatch => {
  dispatch(getAllExamsRequest);
  try {
    const allExams = await db_getAllExams(type)
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

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';

const getCategoriesRequest = { type: GET_CATEGORIES_REQUEST };
const getCategoriesSuccess = (categories) => ({ type: GET_CATEGORIES_SUCCESS, categories });
const getCategoriesError = error => ({ type: GET_CATEGORIES_ERROR, error });

export const getCategories = () => async dispatch => {
  dispatch(getCategoriesRequest);
  try {
    const categories = await db_getCategories()
    dispatch(getCategoriesSuccess(categories))

  } catch (error) {
    dispatch(getCategoriesError(error));
  }
};


export const GET_CATEGORY_DETAIL_REQUEST = 'GET_CATEGORY_DETAIL_REQUEST';
export const GET_CATEGORY_DETAIL_SUCCESS = 'GET_CATEGORY_DETAIL_SUCCESS';
export const GET_CATEGORY_DETAIL_ERROR = 'GET_CATEGORY_DETAIL_ERROR';
export const RESET_CATEGORY_DETAIL = 'RESET_CATEGORY_DETAIL';

const getCategoryDetailRequest = { type: GET_CATEGORY_DETAIL_REQUEST };
const getCategoryDetailSuccess = (categoryDetail) => ({ type: GET_CATEGORY_DETAIL_SUCCESS, categoryDetail });
const getCategoryDetailError = error => ({ type: GET_CATEGORY_DETAIL_ERROR, error });

export const getCategoryDetail = (category_id, student_id) => async dispatch => {
  dispatch(getCategoryDetailRequest);
  try {
    const categoryDetail = await db_getCategoryDetail(category_id)
    const categorySessions = await db_getCategorySessions(category_id, student_id)
    const categoryQuestions = await db_getCategoryQuestions(category_id)
    const completedCategoryQuestions = await db_getCompletedQuestions(category_id, student_id)

    const totalQuestions = categoryQuestions.reduce(function (prev, cur) {
      return prev + cur.question_order.length;
    }, 0);
    const totalCompletedQuestions = [...new Set(completedCategoryQuestions.map(JSON.stringify))].map(JSON.parse).reduce(function (prev, cur) {
      return prev + cur.question_order.length;
    }, 0);

    console.log([...new Set(completedCategoryQuestions)])

    dispatch(getCategoryDetailSuccess({
      details: categoryDetail,
      sessions: categorySessions,
      totalQuestions,
      totalCompletedQuestions
    }))

  } catch (error) {
    dispatch(getCategoryDetailError(error));
  }
};

export const resetCategoryDetail = () => {
  return {
    type: RESET_CATEGORY_DETAIL
  }
}

export const GET_ALL_STUDENTS_REQUEST = 'GET_ALL_STUDENTS_REQUEST';
export const GET_ALL_STUDENTS_SUCCESS = 'GET_ALL_STUDENTS_SUCCESS';
export const GET_ALL_STUDENTS_ERROR = 'GET_ALL_STUDENTS_ERROR';

const getAllStudentsRequest = { type: GET_ALL_STUDENTS_REQUEST };
const getAllStudentsSuccess = (allStudents) => ({ type: GET_ALL_STUDENTS_SUCCESS, allStudents });
const getAllStudentsError = error => ({ type: GET_ALL_STUDENTS_ERROR, error });

export const getAllStudents = () => async dispatch => {
  dispatch(getAllStudentsRequest);
  try {
    const allStudents = await db_getAllStudents();

    dispatch(getAllStudentsSuccess(
      allStudents
    ))

  } catch (error) {
    dispatch(getAllStudentsError(error));
  }
};

export const GET_STUDENT_STATS_REQUEST = 'GET_STUDENT_STATS_REQUEST';
export const GET_STUDENT_STATS_SUCCESS = 'GET_STUDENT_STATS_SUCCESS';
export const GET_STUDENT_STATS_ERROR = 'GET_STUDENT_STATS_ERROR';

const getStudentStatsRequest = { type: GET_STUDENT_STATS_REQUEST };
const getStudentStatsSuccess = (studentStats) => ({ type: GET_STUDENT_STATS_SUCCESS, studentStats });
const getStudentStatsError = error => ({ type: GET_STUDENT_STATS_ERROR, error });

export const getStudentStats = (student_id) => async dispatch => {
  dispatch(getStudentStatsRequest);
  try {
    const studentStats = await db_getStudentStatistics(student_id);

    dispatch(getStudentStatsSuccess(
      studentStats
    ))

  } catch (error) {
    dispatch(getStudentStatsError(error));
  }
};


import axios from 'axios'

const db = axios.create({
  baseURL: 'http://localhost:3000'
});

export const db_getAllExams = async () => {
  const response = await db.get('/structures/type/Exam')

  console.log(response.data)

  return response.data
}


export const db_getExamDetail = async (structure_id) => {
  const response = await db.get('/structures/' + structure_id.toString())

  console.log(response.data)

  return response.data
}

export const db_getSectionDetail = async (section_id) => {
  const response = await db.get('/sections/' + section_id.toString())

  console.log(response.data)

  return response.data
}

export const db_getQuestionDetail = async (question_id) => {
  const response = await db.get('/questions/' + question_id.toString())

  return response.data
}
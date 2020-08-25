import axios from 'axios'

const db = axios.create({
  baseURL: 'http://localhost:3000'
});

export const db_getAllExams = async () => {
  const response = await db.get('/structures/type/Exam')

  console.log(response.data)

  return response.data
}
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
  return response.data
}

export const db_getSectionDetail = async (section_id) => {
  const response = await db.get('/sections/' + section_id.toString())

  return response.data
}

export const db_getQuestionDetail = async (question_id) => {
  const response = await db.get('/questions/' + question_id.toString())

  return response.data
}

export const db_createSession = async (structure_id, student_id) => {
  const response = await db.put('/sessions/', {
    structure_id,
    student_id
  })

  return response.data
}

export const db_updateSession = async (session_id, fields) => {
  const response = await db.post('/sessions/' + session_id.toString(), fields)

  return response.data
}

export const db_updateSessionTime = async (session_id) => {
  const response = await db.post('/sessions/' + session_id.toString() + '/time', {})

  return response.data
}

export const db_findSession = async (session_id) => {
  const response = await db.get('/sessions/' + session_id.toString())

  return response.data
}


export const db_getAllStructureSessions = async (structure_id) => {
  const response = await db.get('/sessions/structure/' + structure_id.toString())

  return response.data
}


export const db_createResponse = async (session_id, question_id, student_id, section_id, value, correct) => {
  const response = await db.put('/responses/', {
    session_id,
    student_id,
    question_id,
    section_id,
    value,
    timestamp: new Date().getTime().toString(),
    correct
  })

  return response.data
}
export const db_updateResponse = async (response_id, value, flagged, committed, correct) => {
  const response = await db.post('/responses/' + response_id.toString(), {
    value,
    flagged,
    committed,
    value,
    correct
  })

  return response.data
}

export const db_findResponse = async (session_id, question_id) => {
  const response = await db.post('/responses/find', {
    session_id,
    question_id
  })

  return response.data
}

export const db_getAllSectionResponses = async (session_id, section_id) => {
  const response = await db.post('/responses/session/' + session_id.toString(), {
    type: "section",
    group_id: section_id
  })

  return response.data
}

export const db_getAllSessionResponses = async (session_id) => {
  const response = await db.post('/responses/session/' + session_id.toString(), {
    type: "structure"
  })

  return response.data
}
import axios from 'axios'

const db = axios.create({
  baseURL: 'http://ec2-3-26-34-195.ap-southeast-2.compute.amazonaws.com:3000'
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

export const db_updateSessionTime = async (session_id, type) => {
  const response = await db.post('/sessions/' + session_id.toString() + '/time', {
    type
  })

  return response.data
}

export const db_findSession = async (session_id) => {
  const response = await db.get('/sessions/' + session_id.toString())

  return response.data
}


export const db_getAllStructureSessions = async (structure_id, student_id) => {
  const response = await db.get('/sessions/structure/' + structure_id.toString(), {
    headers: {
      student_id
    }
  })

  return response.data
}


export const db_createResponse = async (session_id, question_id, student_id, section_id, value, correct, flagged) => {
  const response = await db.put('/responses/', {
    session_id,
    student_id,
    question_id,
    section_id,
    value,
    timestamp: new Date().getTime().toString(),
    correct,
    flagged
  })

  return response.data
}
export const db_updateResponse = async (response_id, value, correct) => {
  const response = await db.post('/responses/' + response_id.toString(), {
    value,
    correct
  })

  return response.data
}

export const db_createBareResponse = async (session_id, question_id, student_id, section_id, flagged) => {
  const response = await db.put('/responses/bare', {
    session_id,
    student_id,
    question_id,
    section_id,
    timestamp: new Date().getTime().toString(),
    flagged
  })

  return response.data

}

export const db_flagResponse = async (response_id, flagged) => {
  const response = await db.post('/responses/' + response_id.toString() + '/flag', {
    flagged
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

export const db_findStem = async (stem_id) => {
  const response = await db.get('/stems/' + stem_id.toString())

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


export const db_userExists = async (username) => {
  const response = await db.get('/users/' + username)

  return response.data
}

export const db_createUser = async (username) => {
  const response = await db.post('/users', {
    username
  })

  return response.data
}

export const wp_authenticate = async (email, password) => {
  const response = await db.post(`https://in2med.com.au/?rest_route=/simple-jwt-login/v1/auth`, {
    email,
    password
  })

  return response.data
}
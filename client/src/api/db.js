import axios from 'axios'
import ExampleExam from '../constants/example_exam.json'

const db = axios.create({
  baseURL: 'http://localhost:3000'
});

export const db_getAllExams = async () => {
  const response = await db.get('/structures/type/Exam')

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


export const db_createResponse = async (session_id, question_id, student_id, section_id, value, correct, flagged, points, stem_id) => {
  const response = await db.put('/responses/', {
    session_id,
    student_id,
    question_id,
    section_id,
    value,
    timestamp: new Date().getTime().toString(),
    correct,
    flagged,
    points,
    stem_id
  })

  return response.data
}
export const db_updateResponse = async (response_id, value, correct, points) => {
  const response = await db.post('/responses/' + response_id.toString(), {
    value,
    correct,
    points
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

export const db_createQuestion = async (type,
  options,
  question,
  answer,
  explanation,
  difficulty,
  image,
  option_images,
  stem_id) => {


  const response = await db.put(`/questions`, {
    type,
    options,
    question,
    answer,
    explanation,
    difficulty,
    image,
    option_images,
    stem_id
  })

  return response.data
}

export const db_createStem = async (text, question_order, image, category_id, type) => {

  const response = await db.put(`/stems`, {
    text, question_order, image, category_id, type
  })

  return response.data
}

export const db_updateStem = async (stem_id, question_order) => {
  const response = await db.post(`/stems/` + stem_id.toString(), {
    question_order
  })

  return response.data
}

export const db_createSection = async (
  name,
  description,
  question_order,
  time
) => {

  const response = await db.put(`/sections`, {
    name,
    description,
    question_order,
    time
  })

  return response.data
}

export const db_createExam = async (
  name,
  description,
  type,
  section_order,
  time,
  category_id = null
) => {

  const response = await db.put(`/structures`, {
    name,
    description,
    type,
    section_order,
    time,
    category_id
  })

  return response.data
}


export const import_exam = async (data) => {

  try {
    let sectionOrder = []
    for (const section of ExampleExam.sections) {
      let sectionQuestionOrder = []

      for (const stem of section.stems) {
        let stemQuestionOrder = []

        // Create stem
        let createdStem = await db_createStem(
          stem.text ? stem.text : null,
          null,
          stem.image ? stem.image : null,
          stem.category_id ? stem.category_id : null,
          "Exam"
        )

        for (const question of stem.questions) {

          // Create questions
          let createdQuestion = await db_createQuestion(
            question.type == "Multiple Choice" ? "MC" : "DD",
            question.options,
            question.text ? question.text : null,
            question.type == "Multiple Choice" ? question.answer : question.answer.join(";"),
            question.explanation ? question.explanation : null,
            question.difficulty ? question.difficulty : null,
            question.image ? question.image : null,
            question.option_images ? question.option_images : null,
            createdStem.stem_id
          )

          console.log(createdQuestion.options)

          // Append question id to question_order
          stemQuestionOrder.push(createdQuestion.question_id)
          sectionQuestionOrder.push(createdQuestion.question_id)
        }
        let updatedStem = await db_updateStem(createdStem.stem_id, stemQuestionOrder)
      }

      // Create Section
      let createdSection = await db_createSection(
        section.name,
        section.description ? section.description : null,
        sectionQuestionOrder,
        section.time ? section.time : null,
      )

      // Append section orders
      sectionOrder.push(createdSection.section_id)
    }

    // Create Exam!
    let createdExam = await db_createExam(
      ExampleExam.exam.name,
      ExampleExam.exam.description ? ExampleExam.exam.description : null,
      "Exam",
      sectionOrder,
      ExampleExam.exam.time ? ExampleExam.exam.time : null
    )

    console.log(createdExam)

  } catch (err) {
    console.log(err)
  }
}

export const db_getCompletedQuestions = async (category_id, student_id) => {
  const response = await db.post(`/responses/find/completed`, {
    student_id,
    category_id
  })

  return response.data
}

export const db_getCategoryQuestions = async (category_id) => {
  const response = await db.get(`/stems/category/${category_id}`)

  return response.data
}

export const db_getCategories = async () => {
  const response = await db.get(`/categories`)

  return response.data
}

export const db_getCategoryDetail = async (category_id) => {
  const response = await db.get(`/categories/${category_id}`)

  return response.data
}

export const db_getCategorySessions = async (category_id, student_id) => {
  const response = await db.post(`/sessions/category`, {
    category_id,
    student_id
  })

  return response.data
}
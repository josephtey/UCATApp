import axios from 'axios'

const uk = axios.create({
  baseURL: 'https://in2med.co.uk'
});


export const uk_authenticateUser = async (email, password) => {
  const response = await uk.post('/?rest_route=/simple-jwt-login/v1/auth', {
    email,
    password
  })

  return response.data
}

export const uk_verifyEnrollment = async (student_id) => {
  const response = await uk.get(`/wp-json/llms/v1/students/${student_id}/enrollments`)
  const enrolled = response.data.find(course => course.post_id === 19298).status === "enrolled";

  return enrolled;
}

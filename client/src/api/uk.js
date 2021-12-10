import axios from 'axios'

const uk = axios.create({
  baseURL: 'http://localhost:3000' // LOCAL
  // baseURL: 'http://ec2-3-26-34-195.ap-southeast-2.compute.amazonaws.com:3000' // DEV
  // baseURL: 'http://ec2-13-239-117-211.ap-southeast-2.compute.amazonaws.com:3000' // PROD
});


export const uk_authenticateUser = async (email, password) => {
  const response = await uk.post('/users/uk/auth', {
    email,
    password
  })

  return response.data
}

export const uk_verifyEnrollment = async (student_id) => {
  const response = await uk.post('/users/uk/verify', {
    student_id
  })

  return response.data;
}

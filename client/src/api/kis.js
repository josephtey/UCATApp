import axios from 'axios'

const kis = axios.create({
  baseURL: 'http://localhost:3000' // LOCAL
  // baseURL: 'http://ec2-3-26-34-195.ap-southeast-2.compute.amazonaws.com:3000' // DEV
  // baseURL: 'http://ec2-13-239-117-211.ap-southeast-2.compute.amazonaws.com:3000' // PROD
});


export const kis_verifyUser = async (verifier, value) => {
  const response = await kis.post('/users/kis/verify', {
    verifier,
    value
  })
  return response.data
}

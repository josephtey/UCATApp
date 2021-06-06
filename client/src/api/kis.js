import axios from 'axios'

const kis = axios.create({
  baseURL: 'https://api.kisacademics.com/api/in2med/' // PROD
});

kis.defaults.headers = {
  'x-api-key': '2e6833da-a587-43bb-849e-4ab641b97ee3'
}


export const kis_verifyUser = async (verifier, value) => {
  const response = await kis.get(`ucatenrolment?${verifier}=${value}`)

  return response.data
}

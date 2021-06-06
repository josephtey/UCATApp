var express = require('express');
var axios = require('axios')

const kis = axios.create({
  baseURL: 'https://api.kisacademics.com/api/in2med/' // PROD
});

kis.defaults.headers = {
  'x-api-key': '2e6833da-a587-43bb-849e-4ab641b97ee3'
}


const { db } = require('../db');

const router = express.Router()

router.get('/', async function (req, res, next) {
  try {
    let result = await db.users.total()
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.get('/:username', async function (req, res, next) {
  try {
    let result = await db.users.find(req.params.username)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.get('/stats/:student_id', async function (req, res, next) {
  try {
    let result = await db.users.stats(req.params.student_id)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/', async function (req, res, next) {
  try {
    console.log(req.body)
    let result = await db.users.add(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});
router.post('/full', async function (req, res, next) {
  try {
    console.log(req.body)
    let result = await db.users.addFull(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});
router.post('/authenticate', async function (req, res, next) {
  try {
    console.log(req.body)
    let result = await db.users.authenticate(req.body)
    if (result) {
      res.send(result)
    } else {
      res.send({
        error: 'wrong_credentials'
      })
    }

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});


router.post('/kis/verify', async function (req, res, next) {
  try {
    const response = await kis.get(`ucatenrolment?${req.body.verifier}=${req.body.value}`)

    res.send(response.data)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});


module.exports = router;

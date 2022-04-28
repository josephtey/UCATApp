var express = require('express');
var axios = require('axios')
var jwt = require('express-jwt');

const uk = axios.create({
  baseURL: 'https://in2med.co.uk'
});

uk.defaults.headers = {
  'X-LLMS-CONSUMER-KEY': 'ck_68cb7ccc6a325899ef001cf91d280eb0a2ea95d0',
  'X-LLMS-CONSUMER-SECRET': 'cs_d6d11faf3c935547ccc1f81a2799ed6cbddea12e',
}

const kis = axios.create({
  baseURL: 'https://api.kisacademics.com/api/in2med/'
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
// router.post('/authenticate', jwt({ secret: 'secret', algorithms: ['HS256'] }), async function (req, res, next) {
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

router.post('/uk/auth', async function (req, res, next) {
  try {
    const response = await uk.post('/?rest_route=/simple-jwt-login/v1/auth', {
      email: req.body.email,
      password: req.body.password
    })

    res.send(response.data)

  } catch (err) {
    res.send(
      {
        "success": false
      }
    )
  }
});

router.post('/uk/verify', async function (req, res, next) {
  try {
    const response = await uk.get(`/wp-json/llms/v1/students/${req.body.student_id}/enrollments`)
    const enrolled = response.data.find(course => course.post_id === 19298 || course.post_id === 28756).status === "enrolled";

    res.send({
      enrolled
    })

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});



module.exports = router;

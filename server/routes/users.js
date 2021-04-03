var express = require('express');

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



module.exports = router;

var express = require('express');

const { db } = require('../db');

const router = express.Router()


router.post('/', async function (req, res, next) {

  try {
    const result = await db.questions.add(req.body)
    res.send(result)
  } catch (err) {
    console.log(err)
    res.send(err)
  }

});

router.get('/', async function (req, res, next) {
  try {
    let result = await db.questions.total()
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.get('/:question_id', async function (req, res, next) {
  try {
    let result = await db.questions.detail(req.params.question_id)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/:question_id', async function (req, res, next) {
  try {
    let result = await db.questions.update(req.params.question_id, req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.delete('/:question_id', async function (req, res, next) {
  try {
    let result = await db.questions.delete(req.params.question_id)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

module.exports = router;

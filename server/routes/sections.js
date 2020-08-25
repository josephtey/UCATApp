var express = require('express');

const { db } = require('../db');

const router = express.Router()


router.get('/', async function (req, res, next) {
  try {
    let result = await db.sections.total()
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/', async function (req, res, next) {
  try {
    let result = await db.sections.add(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/populate', async function (req, res, next) {
  try {
    let result = await db.sections.populate(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.get('/:section_id/questions', async function (req, res, next) {
  try {
    let questions = await db.sections.getQuestions(req.params.section_id)
    res.send(questions)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

module.exports = router;

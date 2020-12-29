var express = require('express');

const { db } = require('../db');

const router = express.Router()

router.put('/', async function (req, res, next) {
  try {
    let result = await db.stems.add(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/:stem_id', async function (req, res, next) {
  try {
    let result = await db.stems.update(req.params.stem_id, req.body.question_order)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.get('/:stem_id', async function (req, res, next) {
  try {
    let result = await db.stems.find(req.params.stem_id)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

module.exports = router;

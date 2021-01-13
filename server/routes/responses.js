var express = require('express');

const { db } = require('../db');

const router = express.Router()

router.post('/find', async function (req, res, next) {
  try {
    let result = await db.responses.find(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/find/completed', async function (req, res, next) {
  try {
    let result = await db.responses.find_completed(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

// Get all responses
router.post('/session/:session_id', async function (req, res, next) {
  try {
    let result = await db.responses.total(req.body.type, req.params.session_id, req.body.group_id)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/:response_id', async function (req, res, next) {
  try {
    let result = await db.responses.update(req.params.response_id, req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/:response_id/flag', async function (req, res, next) {
  try {
    let result = await db.responses.flag(req.params.response_id, req.body.flagged)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.put('/', async function (req, res, next) {
  try {
    let result = await db.responses.add(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.put('/bare', async function (req, res, next) {
  try {
    let result = await db.responses.add_bare(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});



module.exports = router;

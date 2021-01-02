var express = require('express');

const { db } = require('../db');

const router = express.Router()

// Get all sessions
router.get('/', async function (req, res, next) {
  try {
    let result = await db.sessions.total()
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.get('/structure/:structure_id', async function (req, res, next) {

  try {
    let result = await db.sessions.total_structure(req.params.structure_id, req.headers.student_id)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.put('/', async function (req, res, next) {
  try {
    let result = await db.sessions.add(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.delete('/:session_id', async function (req, res, next) {
  try {
    let result = await db.sessions.delete(req.params.session_id)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/category', async function (req, res, next) {
  try {
    let result = await db.sessions.find_category(
      req.body.category_id,
      req.body.student_id
    )
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/:session_id', async function (req, res, next) {
  try {
    console.log(req.body)
    let result = await db.sessions.update(req.params.session_id, req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/:session_id/time', async function (req, res, next) {
  try {
    console.log(req.body)
    let result = await db.sessions.update_time(req.params.session_id, req.body.type)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});


router.post('/:session_id/review', async function (req, res, next) {
  try {
    let result = await db.sessions.update_review(req.params.session_id, req.body.show)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});


router.get('/:session_id', async function (req, res, next) {
  try {
    let result = await db.sessions.find(req.params.session_id)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

module.exports = router;

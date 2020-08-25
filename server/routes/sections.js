var express = require('express');

const { db } = require('../db');

const router = express.Router()

// Get all sections
router.get('/', async function (req, res, next) {
  try {
    let result = await db.sections.total()
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

// Create new section
router.put('/', async function (req, res, next) {
  try {
    let result = await db.sections.add(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

// Update section
router.post('/:section_id', async function (req, res, next) {
  try {
    let result = await db.sections.update(req.params.section_id, req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

// Delete a section
router.delete('/:section_id', async function (req, res, next) {
  try {
    let result = await db.sections.delete(req.params.section_id)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

// Add questions to a section
router.post('/:section_id/populate', async function (req, res, next) {
  try {
    let result = await db.sections.populate(req.params.section_id, req.body.question_ids)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

// Get the details for a single section, including all of its questions
router.get('/:section_id', async function (req, res, next) {
  try {
    let questions = await db.sections.detail(req.params.section_id)
    res.send(questions)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

module.exports = router;

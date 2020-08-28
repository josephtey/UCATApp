var express = require('express');

const { db } = require('../db');

const router = express.Router()

// Get all sections
router.get('/', async function (req, res, next) {
  try {
    let result = await db.responses.total()
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

module.exports = router;

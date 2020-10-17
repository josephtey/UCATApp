var express = require('express');

const { db } = require('../db');

const router = express.Router()

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

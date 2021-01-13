var express = require('express');

const { db } = require('../db');

const router = express.Router()


router.get('/', async function (req, res, next) {

  try {
    const result = await db.categories.total()
    res.send(result)
  } catch (err) {
    console.log(err)
    res.send(err)
  }

});

router.get('/:category_id', async function (req, res, next) {

  try {
    const result = await db.categories.find(req.params.category_id)
    res.send(result)
  } catch (err) {
    console.log(err)
    res.send(err)
  }

});

module.exports = router;

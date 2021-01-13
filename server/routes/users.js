var express = require('express');

const { db } = require('../db');

const router = express.Router()


router.get('/:username', async function (req, res, next) {
  try {
    let result = await db.users.find(req.params.username)
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

var express = require('express');
var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://postgres:123456@localhost:5432/UCATApplicationDB')

const router = express.Router()

router.get('/', async function (req, res, next) {
  try {
    let result = await db.query('SELECT * FROM public."Questions"')
    console.log(result)
    res.send(result)
  } catch (err) {
    res.send(err)
  }
});

module.exports = router;

var express = require('express');

const { db } = require('../db');

const router = express.Router()


router.get('/type/:type', async function (req, res, next) {
  try {
    let result = await db.structures.total(req.params.type)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.get('/:structure_id', async function (req, res, next) {
  try {
    let result = await db.structures.detail(req.params.structure_id)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/:structure_id', async function (req, res, next) {
  try {
    let result = await db.structures.update(req.params.structure_id, req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.put('/', async function (req, res, next) {
  try {
    let result = await db.structures.add(req.body)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.post('/:structure_id/populate', async function (req, res, next) {
  try {
    let result = await db.structures.populate(req.params.structure_id, req.body.section_ids)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

router.delete('/:structure_id', async function (req, res, next) {
  try {
    let result = await db.structures.delete(req.params.structure_id)
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

module.exports = router;

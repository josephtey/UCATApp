var express = require('express');

const { db } = require('../db');

const router = express.Router()


// router.get('/insertQuestion', async function (req, res, next) {
//   try {
//     const data = {
//       tableName: 'Questions',
//       type: 'MC',
//       options: '{"1", "2"}',
//       question: 'How are you doing?',
//       answer: 'Great!',
//       explanation: 'Positive out look on life!',
//       difficulty: '1',
//       category_id: '1'
//     }
//     const result = await db.query(`INSERT INTO ${tableName}(type, options, question, answer, explanation, difficulty, category_id) VALUES (${type}, ${options}, ${question}, ${answer}, ${explanation}, ${difficulty}, ${category_id}) RETURNING *`,
//       data)
//     res.send(result)
//   } catch (err) {
//     console.log(err)
//     res.send(err)
//   }
// });

router.get('/', async function (req, res, next) {
  try {
    let result = await db.questions.total()
    res.send(result)

  } catch (err) {
    console.log(err)
    res.send(err)
  }
});

module.exports = router;

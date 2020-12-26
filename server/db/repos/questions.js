const { questions: sql } = require('../sql');

// {
//   "type": "SA",
//   "options": "{'1', '2'}",
//   "question": "How are you doing?",
//   "answer": "Great!",
//   "explanation": "Positive out look on life!",
//   "difficulty": "1",
//   "category_id": "1"
// }

class QuestionsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async total() {
    return this.db.query(sql.total);
  }

  async add(values) {
    return this.db.one(sql.add, {
      type: values.type,
      options: values.options,
      question: values.question,
      answer: values.answer,
      explanation: values.explanation,
      difficulty: values.difficulty,
      category_id: values.category_id
    });
  }

  async update(question_id, values) {
    return this.db.one(sql.update, {
      question_id,
      ...values
    });
  }

  async delete(question_id) {
    return this.db.one(sql.delete, {
      question_id
    })
  }

  async detail(question_id) {
    return this.db.one(sql.detail, {
      question_id
    })
  }
}

module.exports = QuestionsRepository;

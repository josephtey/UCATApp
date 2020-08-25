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
    return this.db.many(sql.total);
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
}

module.exports = QuestionsRepository;

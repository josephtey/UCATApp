const { questions: sql } = require('../sql');

class QuestionsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async total() {
    return this.db.query(sql.total);
  }

  async add(values) {
    console.log(values)
    return this.db.one(sql.add, values);
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

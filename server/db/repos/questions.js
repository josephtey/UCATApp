const { questions: sql } = require('../sql');

class QuestionsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }
  // Returns the total number of questions;
  async total() {
    return this.db.query('SELECT * FROM "Questions"');
  }
}

module.exports = QuestionsRepository;

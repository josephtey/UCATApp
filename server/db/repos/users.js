const { users: sql } = require('../sql');

class UsersRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }
  async total() {
    return this.db.query(sql.total)
  }
  async add(data) {
    return this.db.one(sql.add, data)
  }

  async find(username) {
    return this.db.oneOrNone(sql.find, {
      username
    });
  }

  async stats(student_id) {
    const category_stats_true = await this.db.query(sql.category_stats, {
      student_id,
      correct: true
    })
    const category_stats_false = await this.db.query(sql.category_stats, {
      student_id,
      correct: false
    })
    const response_stats_true = await this.db.query(sql.response_stats, {
      student_id,
      correct: true
    })
    const response_stats_false = await this.db.query(sql.response_stats, {
      student_id,
      correct: false
    })

    return {
      category_stats_true,
      category_stats_false,
      response_stats_true,
      response_stats_false
    }
  }

  async addFull(data) {
    return this.db.one(sql.addFull, data)
  }

  async authenticate(data) {
    return this.db.oneOrNone(sql.authenticate, data)
  }
}

module.exports = UsersRepository;

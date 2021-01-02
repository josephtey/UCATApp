const { sessions: sql } = require('../sql');

class SessionsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async total() {
    return this.db.manyOrNone(sql.total);
  }

  async total_structure(structure_id, student_id) {
    return this.db.manyOrNone(sql.total_structure, {
      structure_id,
      student_id
    });
  }

  async find_category(category_id, student_id) {
    return this.db.manyOrNone(sql.find_category, {
      category_id,
      student_id
    });
  }

  async add(values) {
    return this.db.one(sql.add, values);
  }

  async delete(session_id) {
    return this.db.one(sql.delete, {
      session_id
    });
  }

  async update(session_id, values) {
    return this.db.one(sql.update, {
      session_id,
      ...values
    });
  }

  async find(session_id) {
    return this.db.one(sql.find, {
      session_id
    });
  }

  async update_time(session_id, type) {
    if (type == "start") {
      return this.db.one(sql.update_time_start, {
        session_id
      });
    } else {
      return this.db.one(sql.update_time_end, {
        session_id
      });
    }

  }

  async update_review(session_id, show) {
    return this.db.one(sql.update_review, {
      session_id,
      show
    });

  }

}

module.exports = SessionsRepository;

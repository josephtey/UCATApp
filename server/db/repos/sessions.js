const { sessions: sql } = require('../sql');

class SessionsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async total() {
    return this.db.manyOrNone(sql.total);
  }

  async total_structure(structure_id) {
    return this.db.manyOrNone(sql.total_structure, {
      structure_id
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

  async find(structure_id) {
    return this.db.one(sql.find, {
      structure_id
    });
  }

}

module.exports = SessionsRepository;

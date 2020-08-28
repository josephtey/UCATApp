const { responses: sql } = require('../sql');

class ResponsesRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async total(type) {
    if (type === "session") {
      return this.db.many(sql.total_session);
    } else if (type === "section") {
      return this.db.many(sql.total_section);
    }
  }

  async update(values) {
    return this.db.one(sql.update, values)
  }

  async add(values) {
    return this.db.one(sql.add, values)
  }

}

module.exports = ResponsesRepository;

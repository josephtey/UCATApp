const { responses: sql } = require('../sql');

class ResponsesRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async total(type, session_id, group_id) {
    if (type === "structure") {
      return this.db.manyOrNone(sql.total_structure, {
        session_id
      });
    } else if (type === "section") {
      return this.db.manyOrNone(sql.total_section, {
        session_id,
        section_id: group_id
      });
    }
  }

  async update(response_id, values) {
    return this.db.one(sql.update, {
      response_id,
      ...values
    })
  }

  async add(values) {
    return this.db.one(sql.add, values)
  }

  async find(values) {
    return this.db.oneOrNone(sql.find, values)
  }

}

module.exports = ResponsesRepository;

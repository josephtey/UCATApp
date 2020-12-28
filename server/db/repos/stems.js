const { stems: sql } = require('../sql');

class StemsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async find(stem_id) {
    return this.db.one(sql.find, {
      stem_id
    });
  }

  async add(fields) {
    return this.db.one(sql.add, fields);
  }

}

module.exports = StemsRepository;

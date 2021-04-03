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
}

module.exports = UsersRepository;

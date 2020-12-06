const { users: sql } = require('../sql');

class UsersRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async add(username) {
    return this.db.one(sql.add, {
      username
    })
  }

  async find(username) {
    return this.db.oneOrNone(sql.find, {
      username
    });
  }
}

module.exports = UsersRepository;

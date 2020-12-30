const { categories: sql } = require('../sql');


class CategoriesRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  async total() {
    return this.db.query(sql.total);
  }

  async find(category_id) {
    return this.db.one(sql.find, {
      category_id
    });
  }
}

module.exports = CategoriesRepository;

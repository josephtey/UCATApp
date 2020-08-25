const { sections: sql } = require('../sql');

class SectionsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }
  // Returns the total number of questions;
  async total() {
    return this.db.many(sql.total);
  }

  async add(values) {
    return this.db.one(sql.add, {
      name: values.name,
      description: values.description,
      question_order: values.question_order
    })
  }

  async populate(values) {
    // section id, and a list of question ids

    let addedQuestions = []
    for (let i = 0; i < values.question_ids.length; i++) {
      const question = await this.db.one(sql.populate, {
        question_id: values.question_ids[i],
        section_id: values.section_id
      })

      addedQuestions.push(question)
    }

    return addedQuestions
  }

  async getQuestions(section_id) {
    return this.db.many(sql.getQuestions, {
      section_id
    })
  }

}

module.exports = SectionsRepository;

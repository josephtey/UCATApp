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
    const newSection = await this.db.one(sql.add, {
      name: values.name,
      description: values.description,
      question_order: values.question_order,
      time: values.time
    })

    for (let i = 0; i < values.question_order.length; i++) {
      this.db.one(sql.add_section_questions, {
        section_id: newSection.section_id,
        question_id: values.question_order[i]
      })
    }

    return newSection

  }

  async update(section_id, values) {
    return this.db.one(sql.update, {
      section_id,
      name: values.name,
      description: values.description,
      question_order: values.question_order
    })
  }

  async delete(section_id) {
    return this.db.one(sql.delete, {
      section_id
    })
  }

  async populate(section_id, question_ids) {
    // section id, and a list of question ids

    let addedQuestions = []
    for (let i = 0; i < question_ids.length; i++) {
      const question = await this.db.one(sql.populate, {
        question_id: question_ids[i],
        section_id: section_id
      })

      addedQuestions.push(question)
    }

    return addedQuestions
  }

  async detail(section_id) {
    return {
      details: await this.db.one(sql.find, { section_id }),
      questions: await this.db.many(sql.detail, {
        section_id
      })
    }
  }

}

module.exports = SectionsRepository;

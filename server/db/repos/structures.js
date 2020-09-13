const { structures: sql } = require('../sql');

class StructuresRespository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }
  // Returns all structures
  async total(type) {
    return this.db.many(sql.total, {
      type
    });
  }

  async add(values) {

    const newStructure = await this.db.one(sql.add, {
      name: values.name,
      description: values.description,
      type: values.type,
      section_order: values.section_order
    });

    for (let i = 0; i < values.section_order.length; i++) {
      this.db.one(sql.add_structure_section, {
        structure_id: newStructure.structure_id,
        section_id: values.section_order[i]
      })
    }

    return newStructure
  }

  async update(structure_id, values) {
    return this.db.one(sql.update, {
      structure_id,
      ...values
    });
  }

  async populate(structure_id, section_ids) {
    let addedSections = []
    for (let i = 0; i < section_ids.length; i++) {
      const section = await this.db.one(sql.populate, {
        section_id: section_ids[i],
        structure_id
      })

      addedSections.push(section)
    }

    return addedSections
  }

  async detail(structure_id) {
    return {
      details: await this.db.one(sql.find, { structure_id }),
      sections: await this.db.many(sql.detail, { structure_id })
    }
  }

  async delete(structure_id) {
    return this.db.one(sql.delete, { structure_id });
  }
}

module.exports = StructuresRespository;

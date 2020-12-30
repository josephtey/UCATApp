const pgPromise = require('pg-promise');
const dbConfig = require('../db-config.json');
const {
  Questions,
  Sections,
  Structures,
  Sessions,
  Responses,
  Stems,
  Users,
  Categories
} = require('./repos');

const initOptions = {

  extend(obj, dc) {
    obj.questions = new Questions(obj, pgp);
    obj.sections = new Sections(obj, pgp);
    obj.structures = new Structures(obj, pgp);
    obj.sessions = new Sessions(obj, pgp);
    obj.responses = new Responses(obj, pgp);
    obj.stems = new Stems(obj, pgp);
    obj.users = new Users(obj, pgp);
    obj.categories = new Categories(obj, pgp);
  }
};

// Initializing the library:
const pgp = pgPromise(initOptions);

// Creating the database instance:
const db = pgp(dbConfig);

module.exports = { db, pgp };
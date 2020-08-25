const pgPromise = require('pg-promise');
const dbConfig = require('../db-config.json');
const { Questions } = require('./repos');
const { Sections } = require('./repos');
const { Structures } = require('./repos');

const initOptions = {

  extend(obj, dc) {
    obj.questions = new Questions(obj, pgp);
    obj.sections = new Sections(obj, pgp);
    obj.structures = new Structures(obj, pgp);
  }
};

// Initializing the library:
const pgp = pgPromise(initOptions);

// Creating the database instance:
const db = pgp(dbConfig);

module.exports = { db, pgp };
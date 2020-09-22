const { QueryFile } = require('pg-promise');
const { join: joinPath } = require('path');

module.exports = {
  questions: {
    total: sql('questions/total.sql'),
    add: sql('questions/add.sql'),
    delete: sql('questions/delete.sql'),
    detail: sql('questions/detail.sql'),
    update: sql('questions/update.sql')
  },
  sections: {
    total: sql('sections/total.sql'),
    add: sql('sections/add.sql'),
    populate: sql('sections/populate.sql'),
    detail: sql('sections/detail.sql'),
    update: sql('sections/update.sql'),
    delete: sql('sections/delete.sql'),
    find: sql('sections/find.sql')
  },
  structures: {
    total: sql('structures/total.sql'),
    populate: sql('structures/populate.sql'),
    detail: sql('structures/detail.sql'),
    add: sql('structures/add.sql'),
    delete: sql('structures/delete.sql'),
    update: sql('structures/update.sql'),
    find: sql('structures/find.sql'),
    add_structure_section: sql('structures/add_structure_section.sql'),
  },
  sessions: {
    total: sql('sessions/total.sql'),
    total_structure: sql('sessions/total_structure.sql'),
    add: sql('sessions/add.sql'),
    delete: sql('sessions/delete.sql'),
    update: sql('sessions/update.sql'),
    update_time_start: sql('sessions/update_time_start.sql'),
    update_time_end: sql('sessions/update_time_end.sql'),
    find: sql('sessions/find.sql')
  },
  responses: {
    total_structure: sql('responses/total_structure.sql'),
    total_section: sql('responses/total_section.sql'),
    update: sql('responses/update.sql'),
    add: sql('responses/add.sql'),
    find: sql('responses/find.sql')
  }
};

function sql(file) {

  const fullPath = joinPath(__dirname, file); // generating full path;

  const options = {

    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true

    // See also property 'params' for two-step template formatting
  };

  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;
}
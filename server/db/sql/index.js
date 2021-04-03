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
    add_section_questions: sql('sections/add_section_questions.sql'),
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
    find: sql('sessions/find.sql'),
    find_category: sql('sessions/find_category.sql'),
    update_review: sql('sessions/update_review.sql')
  },
  responses: {
    total_structure: sql('responses/total_structure.sql'),
    total_section: sql('responses/total_section.sql'),
    update: sql('responses/update.sql'),
    flag: sql('responses/flag.sql'),
    add: sql('responses/add.sql'),
    add_bare: sql('responses/add_bare.sql'),
    find: sql('responses/find.sql'),
    find_completed: sql('responses/find_completed.sql')
  },
  users: {
    total: sql('users/total.sql'),
    add: sql('users/add.sql'),
    find: sql('users/find.sql'),
    category_stats: sql('users/category_stats.sql'),
    response_stats: sql('users/response_stats.sql')
  },
  stems: {
    find: sql('stems/find.sql'),
    find_category: sql('stems/find_category.sql'),
    add: sql('stems/add.sql'),
    update: sql('stems/update.sql')
  },
  categories: {
    total: sql('categories/total.sql'),
    find: sql('categories/find.sql')
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
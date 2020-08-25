const { QueryFile } = require('pg-promise');
const { join: joinPath } = require('path');

module.exports = {
  questions: {
    total: sql('questions/total.sql'),
    add: sql('questions/add.sql')
  },
  sections: {
    total: sql('sections/total.sql'),
    add: sql('sections/add.sql'),
    populate: sql('sections/populate.sql'),
    getQuestions: sql('sections/getQuestions.sql')
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
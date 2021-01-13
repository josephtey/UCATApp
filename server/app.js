var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var questionsRouter = require('./routes/questions');
var sectionsRouter = require('./routes/sections');
var structuresRouter = require('./routes/structures');
var sessionsRouter = require('./routes/sessions');
var responsesRouter = require('./routes/responses');
var stemsRouter = require('./routes/stems');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');

var app = express();
app.use(cors())

var port = 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/questions', questionsRouter);
app.use('/sections', sectionsRouter);
app.use('/structures', structuresRouter);
app.use('/responses', responsesRouter);
app.use('/sessions', sessionsRouter);
app.use('/stems', stemsRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})

module.exports = app;

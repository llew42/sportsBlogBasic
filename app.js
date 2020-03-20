const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

// MONGOOSE CONNECTION
mongoose.connect('mongodb://localhost/sportsBlog');
const db = mongoose.connection;

const port = 3000;
const app = express();

const index = require('./routes/index');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const manage = require('./routes/manage');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Moment
app.locals.moment = require('moment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname + '/public')));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use( (req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/', index);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});

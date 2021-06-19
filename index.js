const express = require('express');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
// @TODO: change locals vars en ENV
const config = require('./config');

const App = express();

mongoose.connect(config.db);
mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log('connected to mongodb'));

App.use(express.json());

const localSignup = require('./server/passport/local-signup');
const localLogin = require('./server/passport/local-login');
passport.use('local-signup', localSignup);
passport.use('local-login', localLogin);

const authRoutes = require('./server/routes/auth');
const userRoutes = require('./server/routes/users');
const postRoutes = require('./server/routes/posts');
const commentRoutes = require('./server/routes/comments.js');
App.use('/auth', authRoutes);
App.use('/users', userRoutes);
App.use('/posts', postRoutes);
App.use('/comments', commentRoutes);
App.use(express.static(path.resolve(__dirname, 'public')));

// Always return the main index.html, so react-router render the route in the client
App.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 8080;
App.listen(port, (req, res) => {
  console.log('server up and running at ' + port);
});

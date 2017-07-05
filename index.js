const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const App = express();
const mongoose = require('mongoose')
const config = require('./config')
const passport = require('passport')
mongoose.connect(config.db)
mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to mongodb'))

App.use(cors())
App.use(bodyParser.json())


const localSignup = require('./server/passport/local-signup');
const localLogin = require('./server/passport/local-login');
passport.use('local-signup', localSignup);
passport.use('local-login', localLogin);





const authRoutes = require('./server/routes/auth');
const userRoutes = require('./server/routes/users');
const postRoutes = require('./server/routes/posts');
const commentRoutes = require('./server/routes/comments.js')
App.use('/auth', authRoutes);
App.use('/users', userRoutes);
App.use('/posts', postRoutes);
App.use('/comments', commentRoutes)



App.listen(3001, (req, res) => {
    console.log('server up and running at 127.0.0.1:3001')
})
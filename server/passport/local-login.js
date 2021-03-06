const jwt = require('jsonwebtoken');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim(),
    };

    // find a user by email address
    return User.findOne({ email: userData.email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      // check if a hashed user's password is equal to a value saved in the database
      return user.comparePassword(userData.password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          const error = new Error('Incorrect email or password');
          error.name = 'IncorrectCredentialsError';

          return done(error);
        }

        const payload = {
          sub: user._id,
        };
        // create a token string
        const token = jwt.sign(payload, config.jwtSecret);
        const data = {
          name: user.name,
        };

        return done(null, token, data);
      });
    });
  }
);

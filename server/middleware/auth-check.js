const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../../config');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  //split on space because authorization = bearer token
  const token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }

    const userId = decoded.sub;
    console.log('decoded sub', decoded.sub);
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      res.locals.user = decoded.sub;
      console.log('res.locals.user', res.locals.user);
      return next();
    });
  });
};

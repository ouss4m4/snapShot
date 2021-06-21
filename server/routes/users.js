const express = require('express');
const config = require('../../config/');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();
const verifyToken = require('../middleware/auth-check');

router.get('/info', verifyToken, (req, res) => {
  try {
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.json({
        success: false,
        message: 'no authorization on headers',
      });
      return;
    }
    let decoded = jwt.decode(token, config.jwtSecret);
    user.findById(decoded.sub, (err, user) => {
      if (err) {
        console.error(err);
      }

      if (!user) {
        res.json({
          success: false,
          message: 'user do not exist',
        });
      }
      let info = {
        name: user.name,
        email: user.email,
      };
      res.json({
        success: true,
        user: info,
      });
    });
  } catch (err) {
    res.status(500).send({ success: false });
  }
});

module.exports = router;

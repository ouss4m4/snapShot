const express = require('express');
const validator = require('validator');
const router = new express.Router();
const passport = require('passport');

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = {};

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = 'password must have at least 8 characters.';
  }

  if (
    !payload ||
    typeof payload.name !== 'string' ||
    payload.name.trim().length < 2
  ) {
    isFormValid = false;
    errors.name = 'Please provide your name';
  }

  if (!isFormValid) {
    message = 'Check the form for errors';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (
    !payload ||
    typeof payload.email !== 'string' ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = 'Please enter your email';
  }

  if (
    !payload ||
    typeof payload.password !== 'string' ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = 'Please enter your password';
  }

  if (!isFormValid) {
    message = 'check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already in use.',
          },
        });
      }
      return res.json({
        success: false,
        message: 'Could not process the form.',
      });
    }

    return res.json({
      success: true,
      message: 'You are now registered, and may log in !',
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.json({
          success: false,
          message: err.message,
          errors: {
            email: 'check your email',
            password: 'check your password',
          },
        });
      }

      return res.json({
        success: false,
        message: 'could not process the form',
        errors: {
          email: 'check your email',
          password: 'check your password',
        },
      });
    }

    return res.json({
      success: true,
      message: 'You are now logged in!',
      token,
      user: userData,
    });
  })(req, res, next);
});

module.exports = router;

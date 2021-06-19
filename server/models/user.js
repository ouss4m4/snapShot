const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.comparePassword = function comaprePassword(
  password,
  callback
) {
  bcrypt.compare(password, this.password, callback);
};

UserSchema.pre(
  'validate',
  function saveHook(next) {
    const user = this;

    // proceed further only if the password is modified or the user is new
    if (!user.isModified('password')) return next();

    return bcrypt.genSalt((saltError, salt) => {
      if (saltError) {
        return next(saltError);
      }

      return bcrypt.hash(user.password, salt, (hashError, hash) => {
        if (hashError) {
          return next(hashError);
        }

        // replace a password string with hash value
        user.password = hash;

        return next();
      });
    });
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;

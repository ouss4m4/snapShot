const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const user = require('./user');
const config = require('../../config');
const jwt = require('jsonwebtoken');

const postSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    author: { type: String, ref: 'User' },
    comments: [{ type: String, ref: 'Comment' }],
  },
  { timestamps: true }
);

/* postSchema.pre('validate', function saveHook(next) {
  const post = this;

  let decoded = jwt.decode(post.author, config.jwtSecret);
  if (decoded) {
    return user.findById(decoded.sub, (err, user) => {
      if (err) {
        return next(err);
      } 
      if (!user) {
        return;
      }
      post.author = user._id;

      return next();
    });
  }
  var err = new Error('invalid token');
  return next(err);
}); */

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

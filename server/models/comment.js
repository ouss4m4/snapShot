const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const user = require('./user');
const post = require('./post');
const config = require('../../config');
const jwt = require('jsonwebtoken');

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: { type: String, ref: 'User' },
    post: { type: String, ref: 'Post' },
  },
  { timestamps: true }
);

commentSchema.pre('validate', function saveHook(next) {
  const comment = this;
  let decoded = jwt.decode(comment.author, config.jwtSecret);
  if (decoded) {
    return user.findById(decoded.sub, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return;
      }
      console.log('raw autohr', comment);
      comment.author = user._id;
      return next();
    });
  }
  console.log('validated comment', comment);
  var err = new Error('invalid token');
  return next(err);
});

commentSchema.post('save', function (comment) {
  let update = comment._id;

  post.findByIdAndUpdate(
    comment.post,
    { $push: { comments: update } },
    { upsert: true },
    (err, post) => {
      if (err) {
        console.log(err);
      }
      console.log(post);
    }
  );
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

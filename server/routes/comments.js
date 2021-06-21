const express = require('express');
const Comment = require('../models/comment');
const verifyToken = require('../middleware/auth-check');

const router = express.Router();

router.get('/bypost/:id', (req, res) => {
  try {
    Comment.find({ post: req.params.id })
      .populate('author', 'name email')
      .exec((err, comments) => {
        if (err) {
          console.error(err);
        }
        res.json({
          success: true,
          comments: comments,
        });
      });
  } catch (err) {
    res.status(500).send({ success: false });
  }
});

router.post('/add', verifyToken, (req, res) => {
  try {
    let data = {
      text: req.body.text,
      post: req.body.post,
      author: res.locals.user,
    };
    const newComment = new Comment(data);

    newComment.save((err, newComment) => {
      if (err) {
        res.json({
          success: false,
          message: err.message,
        });
        return err;
      }
      res.json({
        success: true,
        comment: newComment,
      });
    });
  } catch (err) {
    res.status(500).send({ success: false });
  }
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const post = require('../models/post');
const user = require('../models/user');
const router = new express.Router();
const config = require('../../config');
const verifyToken = require('../middleware/auth-check');

router.get('/show', (req, res) => {
  try {
    post
      .find({})
      .sort({ createdAt: -1 })
      .populate('author', 'name email')
      .populate({
        path: 'comments',
        select: ' -__v -post',
        populate: { path: 'author', select: 'name email' },
      })
      .exec(function (err, posts) {
        if (err) {
          console.log('caught something', err);
          return res.status(500).send();
        }
        res.json({
          success: true,
          posts: posts,
        });
      });
  } catch (err) {
    console.log('caught err', err);
    res.json({
      success: false,
      posts: [],
    });
  }
});

router.get('/single/:id', (req, res) => {
  try {
    post
      .findById(req.params.id)
      .populate('author', 'name email')
      .populate({
        path: 'comments',
        select: '-_id -__v -post',
        populate: { path: 'author', select: 'name email -_id' },
      })
      .exec(function (err, posts) {
        if (err) return console.log(err);
        res.send(posts);
      });
  } catch (err) {
    res.status(500).send({ success: false });
  }
});

router.get('/user', verifyToken, (req, res) => {
  try {
    let user = res.locals.user;
    post
      .find({ author: user })
      .populate('author', 'name email')
      .exec(function (err, posts) {
        if (err) return console.log(err);
        res.json({
          success: true,
          userPosts: posts,
        });
      });
  } catch (err) {
    res.status(500).send({ success: false });
  }
});

router.post('/add', verifyToken, (req, res) => {
  let postData = {
    title: req.body.title,
    detail: req.body.detail,
    imageUrl: req.body.imageUrl,
    comments: [],
    author: res.locals.user,
  };

  const newPost = new post(postData);
  try {
    newPost.save((err, newPost) => {
      if (err) {
        res.json({
          success: false,
          message: err.message,
        });
        return err;
      }
      res.json({
        success: true,
        post: newPost,
      });
    });
  } catch (err) {
    res.status(500).send({ success: false });
  }
});

module.exports = router;

const express = require('express');
const post = require('../models/post')
const user = require('../models/user')
const router = new express.Router();
// 


router.get('/show', (req, res) => {
    post.find().populate('author ', 'name email').
        populate({
            path: 'comments',select: ' -__v -post',
         
            populate: { path: 'author', select: 'name email'}
        }).
    exec(function (err, posts) {
        if (err) return handleError(err);
        res.json({
            success: true,
            posts: posts
        })
    });
})
router.get('/single/:id', (req,res) => {
   post.findById(req.params.id).populate('author ', 'name email').
        populate({
            path: 'comments',select: '-_id -__v -post',
      
            populate: { path: 'author', select: 'name email -_id' }
        }).
    exec(function (err, posts) {
        if (err) return handleError(err);
        res.send(posts)
    });

})
router.post('/add', (req, res) => {
    let postData = {
        title: req.body.title,
        detail: req.body.detail,
        imageUrl: req.body.imageUrl,
        comments: [],
        author: req.headers.authorization.split(' ')[1],
    }
    const newPost = new post(postData);
    newPost.save((err, newPost) => {
        if (err) {
            res.json({
                success: false,
                message: err.message
            })
            return err
        }
        res.json({
            success: true,
            post: newPost
        })
    })
})

module.exports = router;
const express = require('express');
const Comment = require('../models/comment');

const router = express.Router();

router.get('/bypost/:id', (req, res) => {
    Comment.find({post: req.params.id})
        .populate('author','name email')
        .exec((err, comments) => {
        if(err){console.error(err)}
        res.json({
            success: true,
            comments: comments
        })
    })
     
})

router.post('/add', (req, res) => {
    let data = {
        text: req.body.text,
        post: req.body.post,
        author: req.headers.authorization.split(' ')[1],
    }
    const newComment = new Comment(data);
    newComment.save((err, newComment) => {
        if (err) {
            res.json({
                success: false,
                message: err.message
            })
            return err
        }
        res.json({
            success: true,
            comment: newComment
        })

    })
})

module.exports = router;
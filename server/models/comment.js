const mongoose = require('mongoose');
const user = require('./user')
const post = require('./post')
const config = require('../../config')
const jwt = require('jsonwebtoken')

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: { type: String, ref: 'User' },
    post: { type: String, ref: 'Post' },
})

commentSchema.pre('save', function saveHook(next) {
    const comment = this;
    //decode user id from token , replace comment.author with user._id

    let decoded = jwt.decode(comment.author, config.jwtSecret);
    if (decoded) {
        return user.findById(decoded.sub, (err, user) => {
            if (err) { return next(err) }
            if (!user) {
                return
            }
            comment.author = user._id;
            return next();
        })
    }
    var err = new Error('invalid token')
    return next(err)

})

commentSchema.post('save', function (comment) {
    let update =  comment._id ;
     
    post.findByIdAndUpdate(comment.post, { $push: { comments: update } },{ upsert: true }, (err, post) => {
        if(err){console.log(err)}
        console.log(post)
    })

})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;

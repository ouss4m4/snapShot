var user = {
    _id : 'id',
    email: 'email',
    name: 'name',
    pass: 'pass'
}

var post = {
    _id: 'the id has to be used with the comment',
    title : 'title',
    detail: 'detail',
    image : 'image',
    author: users._id,
    comments: ['ids of all comments on this post']

}

var comment = {
    _id: 'comment id, so we push it in post.comments array ',
    text : 'comment text',
    author: user._id,
    post : post._id
}


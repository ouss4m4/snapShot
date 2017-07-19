import React from 'react';
import PostPage from './PostPage'
import CommentPage from './CommentPage'

const SinglePost = ({match}) => {
    return (
        <div>
            <PostPage match={match}/>
            <CommentPage match={match}/>
        </div>
    );
};

export default SinglePost;
import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const SinglePost = ({ post, onCommentAdd }) => {
  return (
    <div style={styles.wrapper}>
      <Card>
        <CardHeader
          title={post.author.name}
          subtitle={post.author.email}
          avatar={'https://www.awareim.com/wp-content/uploads/avatar-1.png'}
        />
        <CardMedia
          overlay={<CardTitle title={post.title} subtitle={post.detail} />}
        >
          <img src={post.imageUrl} alt="" width="100%" />
        </CardMedia>

        <CardActions>
          <FlatButton>
            <i className="fa fa-heart"></i> Like{' '}
          </FlatButton>
          <FlatButton>
            <i className="fa fa-comments" aria-hidden="true"></i> Comments{' '}
            {post.comments.length}{' '}
          </FlatButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default SinglePost;

const styles = {
  wrapper: {
    width: '90vw',
    maxWidth: '680px',
    margin: '6px auto',
  },
};

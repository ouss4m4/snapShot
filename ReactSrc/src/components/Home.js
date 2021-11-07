import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const Home = ({ posts }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#00bcd4' }}> Feed </h1>
      <div style={style.grid}>
        {posts.map((p) => (
          <div style={style.single} key={p._id}>
            <Card style={{ height: '100%' }}>
              <CardHeader
                title={p.author.name}
                subtitle={p.author.email}
                avatar={
                  'https://www.awareim.com/wp-content/uploads/avatar-1.png'
                }
              />
              <Link to={`/post/${p._id}`}>
                <CardMedia
                  overlay={<CardTitle title={p.title} subtitle={p.detail} />}
                >
                  <img src={p.imageUrl} alt="" width="100%" />
                </CardMedia>
              </Link>

              <CardActions>
                <FlatButton>
                  <i className="fa fa-heart"></i> Like{' '}
                </FlatButton>
                <Link to={`/post/${p._id}`}>
                  <FlatButton>
                    <i className="fa fa-comments" aria-hidden="true"></i>{' '}
                    Comments {p.comments.length}{' '}
                  </FlatButton>
                </Link>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const style = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  single: {
    width: '90vw',
    maxHeight: '950px',
    margin: '25px auto',
    maxWidth: '750px',
    height: '100%',
  },
};

export default Home;

import React, { Component } from 'react';
import Home from '../components/Home';
import CircularProgress from 'material-ui/CircularProgress';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      fetched: false,
      havePosts: false,
      posts: [],
    };
  }
  componentWillMount() {
    this.setState({ fetching: true, fetched: false, posts: null });
    fetch('/posts/show')
      .then((ans) => ans.json())
      .then((json) => {
        if (json.success) {
          if (json.posts.length === 0) {
            this.setState({
              fetching: false,
              fetched: true,
              havePosts: false,
              posts: [],
            });
          } else {
            this.setState({
              fetching: false,
              fetched: true,
              havePosts: true,
              posts: json.posts,
            });
          }
        } else {
          this.setState({
            fetching: false,
            fetched: true,
            havePosts: false,
            posts: null,
          });
        }
      });
  }
  //
  render() {
    const { fetching, fetched, posts, havePosts } = this.state;
    return (
      <div className="wrap">
        {fetching ? (
          <CircularProgress />
        ) : fetched && !havePosts ? (
          'no posts yet, be the first ?'
        ) : fetched && posts ? (
          <Home posts={posts} />
        ) : (
          'errors ofc'
        )}
      </div>
    );
  }
}

export default HomePage;

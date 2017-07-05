import React, { Component } from 'react';
import Home from '../components/Home'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      fetched: false,
      havePosts: false,
      posts: []
    }
  }
  componentWillMount() {
    this.setState({ fetching: true, fetched: false, posts: null })
    fetch('http://localhost:3001/posts/show')
      .then(ans => ans.json())
      .then(json => {
        if (json.success) {
          if (json.posts.length === 0) {
            console.log('0 posts')
            this.setState({
              fetching: false,
              fetched: true,
              havePosts: false,
              posts: []
            })
          }
          this.setState({
            fetching: false,
            fetched: true,
            havePosts: true,
            posts: json.posts
          })
        } else {
          this.setState({
            fetching: false,
            fetched: true,
            havePosts: false,
            posts: null
          })
        }

      })

  }
  //
  render() {
    const { fetching, fetched, posts, havePosts } = this.state;
    return (
      <div className='wrap'>
        {fetching ? <i className="fa fa-spinner fa-spin"></i> :
          fetched && !havePosts ? 'no posts yet, be the first ?' :
            fetched && posts ? <Home posts={posts} /> : 'wtf'}
      </div>
    );
  }
}

export default HomePage;
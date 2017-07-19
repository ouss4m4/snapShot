import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SinglePost from '../components/SinglePost'

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            fetched: true,
            post: null
        }
    }
    handleCommentAdd = () => {
        this.getPost();
    }
    getPost = () => {
        //this is bad, page refresh after adding a comment,
        this.setState({ fetching: true, fetched: false, post: null })
        let id = this.props.match.params.id;

        fetch(`/posts/single/${id}`)
            .then(ans => ans.json())
            .then(ans => this.setState({
                fetching: false, fetched: true, post: ans
            }))
            .catch(err => console.log(err))
    }
    componentDidMount() {
        if (this.state.post === null) {
            this.getPost()
        }
    }

    render() {
        const { fetching, fetched, post } = this.state;
        return (
            <div>
                <div style={{textAlign: 'center'}}><Link to='/' ><i className="fa fa-arrow-left" aria-hidden="true"></i> Back </Link> </div>
                {fetching ? <i className='fa fa-spinner fa-spin'></i> :
                    fetched && post === null ? <h1> error fetching , retry </h1> :
                        <SinglePost post={post} onCommentAdd={this.handleCommentAdd} />}

            </div>
        );
    }
}

export default PostPage;
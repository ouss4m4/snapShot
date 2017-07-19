import React, { Component } from 'react';
import AddPost from '../components/AddPost'
import Auth from '../helpers/Auth'


class AddPostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            post: {
                title: '',
                detail: '',
                imageUrl: ''
            }
        }
    }
    handleChange = (event) => {
        const field = event.target.name;
        const post = this.state.post;
        post[field] = event.target.value;
        this.setState({
            post,
        })
    }

    validateForm = (payload) => {
        //client side validation this time, same style
        var errors = {}
        var isValid = true;
        //title required 
        if (payload.title.length === 0) {
            errors.title = 'please provide a title'
            isValid = false;
        }
        //details required
        if (payload.detail.length === 0) {
            errors.detail = 'please write a small description'
            isValid = false;
        }

        return {
            success: isValid,
            errors: errors
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let postData = {
            title: this.state.post.title,
            detail: this.state.post.detail,
            imageUrl: this.state.post.imageUrl
        }
        let postIsValid = this.validateForm(postData)
        if (!postIsValid.success) {
            this.setState({ errors: postIsValid.errors })
            return;
        }

        let token = Auth.getToken();
        let myHeaders = new Headers({
            "content-type": "application/json",
            "authorization": `bearer ${token}`,
        })

        fetch('/posts/add', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(postData)
        })
            .then(ans => ans.json())
            .then(json => {
                if (json.success) {
                    this.props.history.replace(`/post/${json.post._id}`)
                } else {
                    console.log(json)
                }
            })
    }
    render() {
        return (<div className='container'>
            <AddPost
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                errors={this.state.errors}
                post={this.state.post}
            />
        </div>);
    }
}

export default AddPostPage;
import React, { Component } from 'react';
import AddComment from '../components/AddComment';
import Auth from '../helpers/Auth'
import { Link } from 'react-router-dom'

class CommentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            fetched: false,
            comments: null,
        }
    }
    componentWillMount(){
        this.getComments();
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.comments !== nextState.comment){
            return true
        }
    }
    
    getComments() {
        let id = this.props.match.params.id;
        this.setState({ fetching: true, fetched: false, comments: [] })
        fetch(`/comments/bypost/${id}`)
            .then(ans => ans.json())
            .then(json => this.setState({
                fetching: false, fetched: true, comments: json.comments,
            }))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.text.value.length > 1) {
            let comment = {
                text: e.target.text.value,
                post: this.props.match.params.id
            }
            let token = Auth.getToken();
            let myHeaders = new Headers({
                "content-type": "application/json",
                "authorization": `bearer ${token}`,
            })
            e.target.reset()
            this.setState({ fetching: false, fetched: false, comments: [] })
            fetch('/comments/add', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(comment)
            })
                .then(ans => ans.json())
                .then(json => {
                    console.log(json);
                    this.getComments();
                })
        }
    }
    render() {
        const { fetching, fetched, comments } = this.state;

        return (<div className='wrap'>
            {fetching ? <i className='fa fa-spinner fa-spin'></i>
                : fetched && comments.length !== 0 ? <ul> {comments.map((c, i) => <li key={i}> {c.author.name} : {c.text} </li>)}</ul>
                : <p> be the first to comment </p>}
            {Auth.isUserAuthenticated() ?  <AddComment onSubmit={this.handleSubmit} />
             : <p> please <Link to='/login'>log in</Link> to comment </p>}
        </div>);
    }
}

export default CommentPage;
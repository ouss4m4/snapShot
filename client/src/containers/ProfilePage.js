import React, { Component } from 'react';
import Auth from '../helpers/Auth'
import ProfileCard from '../components/ProfileCard'
import CircularProgress from 'material-ui/CircularProgress';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            user: null,
            isFetching: true,
            userPosts: null,
        }
    }
    componentWillMount() {
        let token = Auth.getToken();
        //fetch the DB for the user info, using the token
        let myHeaders = new Headers({
            "content-type": "application/json",
            'Authorization': `bearer ${token}`
        })
        this.setState({ fetching: true, fetched: false, user: null })
        fetch('http://localhost:3001/users/info', {
            method: 'GET',
            headers: myHeaders
        })
            .then(ans => ans.json())
            .then(json => {
                this.setState({ fetching: false, user: json })
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        let token = Auth.getToken();
        //fetch the DB for the user info, using the token
        let myHeaders = new Headers({
            "content-type": "application/json",
            'Authorization': `bearer ${token}`
        });
        this.setState({ isFetching: true, userPosts: null })
        fetch('http://localhost:3001/posts/user', {
            method: 'GET',
            headers: myHeaders
        })
            .then(ans => ans.json())
            .then(json => {
                this.setState({ isFetching: false, userPosts: json.userPosts })
                console.log(json)
            })
            .catch(err => console.log(err))
    }
    render() {
        const { fetching, user, isFetching, userPosts } = this.state;
        return (<div>
            <div className='wrap'>
                {fetching ? <CircularProgress /> : !user ? 'error' : <ProfileCard user={user.user} />}
            </div>
            <div className='wrap'>
                {isFetching ? <CircularProgress /> : userPosts.length === 0 ? 'you have not posted yet' : `you have ${userPosts.length} posts`}
            </div>
        </div>);
    }
}

export default ProfilePage;
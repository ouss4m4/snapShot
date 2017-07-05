import React, { Component } from 'react';
import Auth from '../helpers/Auth'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: false,
            user: null,
        }
    }
    componentWillMount() {
        let token = Auth.getToken();
        //fetch the DB for the user info, using the token
        let myHeaders = new Headers({
            "content-type": "application/json",
            'Authorization': `bearer ${token}`
        })
        this.setState({fetching :  true, fetched: false, user: null})
        fetch('http://localhost:3001/users/info', {
            method: 'GET',
            headers: myHeaders
        })
            .then(ans => ans.json())
            .then(json => this.setState({fetching: false,  user: json}))
            .catch(err => console.log(err))
    }

    render() {
        const {fetching, user} = this.state;
        return (
            <div>
                {fetching ? <i className='fa fa-spinner fa-spin'></i> : !user ? 'error' : `user : ${user.user.name} ` }
            </div>
        );
    }
}

export default Profile;
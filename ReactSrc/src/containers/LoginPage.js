import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import Auth from '../helpers/Auth'

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            errors: {},
            infoMessage: '',
            user: {
                email: '',
                password: ''
            }
        };
    }
    componentWillMount() {
        const storedMessage = localStorage.getItem('infoMessage');

        if (storedMessage) {
            this.setState({ infoMessage: storedMessage })
            localStorage.removeItem('infoMessage');
        }
    }
    handleChange = (event) => {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({
            user,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();

        let query = {
            email: this.state.user.email,
            password: this.state.user.password
        }
        let myHeaders = new Headers({
            "content-type": "application/json"
        })
        fetch('auth/login', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(query)
        })
            .then(res => res.json())
            .then(ans => {
                if (ans.success) {
                    this.setState({ errors: {} })
                    Auth.authenticateUser(ans.token)
                    this.props.history.push('/profile')
                } else {
                    let errors = ans.errors;
                    errors.summary = ans.message;
                    this.setState({ errors })
                }
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <LoginForm
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                errors={this.state.errors}
                user={this.state.user}
                infoMessage={this.state.infoMessage}
            />
        );
    }
}

export default LoginPage;

import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm'

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            user: {
                email: '',
                name: '',
                password: '',
                password2: '',
            }
        };
    }
    handleChange = (event) => {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({
            user
        })
    }
    passMatch = (pass, pass2) => {
        if (pass === pass2) {
            return true
        } else {
            return false
        }
    }
    handleSubmit = (event) => {

        event.preventDefault();
        let query = {
            name: this.state.user.name,
            email: this.state.user.email,
            password: this.state.user.password,
            password2: this.state.user.password2
        }
        if (!this.passMatch(query.password, query.password2)) {
            let errors = { password2: 'passwords do not match' }
            errors.summary = 'check the form for errors';
            this.setState({ errors: errors });
            return
        } else {
            let myHeaders = new Headers({
                "content-type": "application/json"
            })

            fetch('/auth/signup', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(query)
            })
                .then(res => res.json())
                .then(ans => {
                    if (ans.success) {
                        this.setState({ errors: {} })
                        localStorage.setItem('infoMessage', ans.message)
                        this.props.history.replace('/login')
                    } else {
                        let errors = ans.errors;
                        errors.summary = ans.message;
                        this.setState({ errors: ans.errors })
                    }
                })
                .catch(err => console.log(err))
        }


    }
    render() {
        return (
            <SignUpForm
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }
}

export default SignUpPage;
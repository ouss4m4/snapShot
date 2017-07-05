import  React from 'react';
import Auth from '../helpers/Auth'
import { withRouter } from 'react-router'

const Logout = ({history}) => {
    const logoutUser = () => {
        Auth.deauthenticateUser();
        history.push('/')
    }
    return (
        <a onClick={() => logoutUser() }>
            Logout
        </a>
    );
};

export default withRouter(Logout);
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Logout'
import './style.css'
import Auth from '../helpers/Auth'

const Navbar = () => {
    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <NavLink to="/">Home</NavLink>
                {Auth.isUserAuthenticated() && <NavLink to="/Profile">Profile </NavLink>}
                {Auth.isUserAuthenticated() && <NavLink to='/addpost'>Add post </NavLink>}
            </div>

            <div className="top-bar-right">
                {Auth.isUserAuthenticated() && <Logout /> }
                {!Auth.isUserAuthenticated() && <NavLink to="/login">Log in</NavLink> }
                {!Auth.isUserAuthenticated() && <NavLink to="/signup">Sign up</NavLink> }
            </div>

        </div>
    );
};

export default Navbar;
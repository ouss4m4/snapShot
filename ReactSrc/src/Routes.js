import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Auth from './helpers/Auth';

import Navbar from './components/Navbar';
import HomePage from './containers/HomePage';
import SinglePost from './containers/SinglePost';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import NoMatch from './components/NoMatch';
import ProfilePage from './containers/ProfilePage';
import AddPostPage from './containers/AddPostPage';

const Routes = () => {
  return (
    <Router>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/post/:id" component={SinglePost} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute path="/addpost" component={AddPostPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
export default Routes;

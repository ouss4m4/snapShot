import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const LoginForm = ({ onSubmit, onChange, errors, user, infoMessage }) => {
  return (
    <Card className="container">
      <form onSubmit={onSubmit}>
        <h2 className="card-heading" style={{ color: '#00bcd4' }}>
          Login
        </h2>
        {infoMessage && <p className="success-message"> {infoMessage} </p>}
        {errors.summary && <p className="error-message">{errors.summary}</p>}
        <div className="field-line">
          <TextField
            floatingLabelText="email"
            type="email"
            name="email"
            errorText={errors.email}
            onChange={onChange}
            value={user.email}
          />
        </div>

        <div className="field-line">
          <TextField
            floatingLabelText="Password"
            type="password"
            name="password"
            onChange={onChange}
            errorText={errors.password}
            value={user.password}
          />
        </div>

        <div className="button-line">
          <RaisedButton type="submit" label="Log in" primary />
        </div>

        <CardText>
          Don't have an account? <Link to={'/signup'}>Create one</Link>.
        </CardText>
      </form>
    </Card>
  );
};

export default LoginForm;

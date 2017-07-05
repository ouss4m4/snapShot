import React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const SignUpForm = ({
    onSubmit,
    onChange,
    errors,
    user
}) => {
    return (
        <Card className="container">
            <form action="/" onSubmit={onSubmit}>
                <h2 className="card-heading" style={{ color: '#00bcd4' }}>Sign Up</h2>

                {errors.summary && <p className="error-message">{errors.summary}</p>}

                <div className="field-line">
                    <TextField
                        floatingLabelText="Name"
                        name="name"
                        errorText={errors.name}
                        onChange={onChange}
                        value={user.name}
                    />
                </div>

                <div className="field-line">
                    <TextField
                        floatingLabelText="Email"
                        type='email'
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

                <div className="field-line">
                    <TextField
                        floatingLabelText="Confirm Password"
                        type="password"
                        name="password2"
                        onChange={onChange}
                        errorText={errors.password2}
                        value={user.password2}
                    />
                </div>
                <div className="button-line">
                    <RaisedButton type="submit" label="Create New Account" primary />
                </div>

                <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
            </form>
        </Card>
    );
};

export default SignUpForm;
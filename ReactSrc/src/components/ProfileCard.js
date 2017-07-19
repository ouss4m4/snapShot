import React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const ProfileCard = ({ user }) => (
  <Card>
    <CardHeader
      title={user.name}
      subtitle={user.email}
      avatar={'https://www.awareim.com/wp-content/uploads/avatar-1.png'}
    />
    <CardTitle title="Profile" />
    <CardText>
      <strong> About me </strong>Lorem ipsum dolor sit amet...
    </CardText>

    <CardActions>
      <Link to='#'>
        <RaisedButton label="Posts" />
      </Link>
      <Link to='#'>
        <RaisedButton label="Edit" />
      </Link>
    </CardActions>
  </Card>
);

export default ProfileCard;
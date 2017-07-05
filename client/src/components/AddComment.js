import React from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const AddComment = ({ onSubmit }) => {
    return (
        <Card >
            <form onSubmit={onSubmit} >
                <TextField
                    floatingLabelText='add a comment'
                    name='text'
                    multiLine={true}
                    rows={2}
                    fullWidth={true}
                />
                <div className="button-line">
                    <RaisedButton type="submit" label="add comment" primary />
                </div>
            </form>
        </Card>
    );
};

export default AddComment;
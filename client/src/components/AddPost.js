import React, { Component } from 'react';
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Auth from '../helpers/Auth'
import ImgPreview from './ImgPreview'


const AddPost = ({
    onChange,
    onSubmit,
    post,
    errors
}) => {
    return (
        <Card>
            <form onSubmit={onSubmit}>
                <h3 className='card-heading' >Add a post </h3>
                <div className='field-line'>
                    <TextField
                        floatingLabelText='Title'
                        name='title'
                        type='text'
                        errorText={errors.title}
                        value={post.title}
                        onChange={onChange}
                    />
                </div>
                <div className='field-line'>
                    <TextField
                        floatingLabelText='Details'
                        name='detail'
                        type='text'
                        multiLine={true}
                        rows={2}
                        style={{ textAlign: 'left' }}
                        errorText={errors.detail}
                        value={post.detail}
                        onChange={onChange}
                    />
                </div>
                <div className='field-line'>
                    <TextField
                        floatingLabelText='image url'
                        name='imageUrl'
                        type='text'
                        errorText={errors.imageUrl}
                        value={post.imageUrl}
                        onChange={onChange}
                    />
                </div>
                <div className='field-line'>
                    <ImgPreview url={post.imageUrl} />
                </div>
                <div className="button-line">
                    <RaisedButton type="submit" label="Add Post" primary />
                </div>
                <CardText>  "A picture is worth a thousand words "  </CardText>
            </form>
        </Card>
    );
};

export default AddPost;
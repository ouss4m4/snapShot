import React from 'react';
import { Card, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
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
                        hintText="a lovely title"
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
                        hintText="location or time"
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
                        hintText="a valid image url"
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
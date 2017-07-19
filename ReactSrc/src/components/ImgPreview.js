import React from 'react';

const ImgPreview = ({url}) => {
    return (
        <div style={style}>
            <img src={url} style={style.img} alt='preview'/>
        </div>
    );
};

const style = {
    textAlign: 'center',
    margin: '0 auto',
    width: '200px',
    height: '200px',
    img : {
        height: '100%',
        width: '100%'
    }
}
export default ImgPreview;
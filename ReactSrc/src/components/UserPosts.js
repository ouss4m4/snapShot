import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Link } from 'react-router-dom';

const UserPosts = ({ posts }) => {
  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      maxWidth: 960,
      maxHeight: 550,
      overflowY: 'auto',
    },
  };
  const tilesData = posts;

  return (
    <div style={styles.root}>
      <GridList cellHeight={180} style={styles.gridList}>
        <Subheader>Your Posts</Subheader>
        {tilesData.map((tile) => (
          <GridTile
            key={tile._id}
            title={tile.title}
            subtitle={tile.detail}
            actionIcon={
              <Link to={`/post/${tile._id}`}>
                <IconButton>
                  <StarBorder color="white" />
                </IconButton>
              </Link>
            }
          >
            <img src={tile.imageUrl} />
          </GridTile>
        ))}
      </GridList>
    </div>
  );
};

export default UserPosts;

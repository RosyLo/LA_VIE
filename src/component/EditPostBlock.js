import { React, useState } from 'react';
import PropTypes from 'prop-types';
import '../style/post.css';
import DeletePopup from './DeletePopup';

function EditPostBlock({ postID }) {
  const [wantDelete, setWantDelete] = useState(false);
  return (
    <>
      <div className='editPostBlock'>
        <div className='editPost'>Edit</div>
        <div
          className='deletePost'
          onClick={() => {
            setWantDelete(!wantDelete);
          }}>
          Delete
        </div>
        <div className='checktComments'>Comments</div>
      </div>
      {wantDelete ? <DeletePopup postID={postID} /> : ''}
    </>
  );
}
EditPostBlock.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default EditPostBlock;

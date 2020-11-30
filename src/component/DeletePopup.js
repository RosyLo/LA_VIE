import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

function DeletePost({ postID }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className='modal'>
        <div className='leftModel'></div>
        <div className='rightModel'>
          <button>&times;</button>
        </div>
      </div>
      <div className='overlay'></div>
    </>
  );
}

DeletePost.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default DeletePost;

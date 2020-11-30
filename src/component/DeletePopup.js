import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// function DeletePost ({ postID }) {
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.user);

//     return (

//   }

DeletePost.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default DeletePost;

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { togglePostLike } from '../redux/actions';
import '../style/heart.css';

function Heart({ postID, postLikes }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLiked = user ? postLikes.includes(user.uid) : false;

  return (
    <div
      className={`heart${isLiked ? ' heart-like' : ''}`}
      onClick={() => dispatch(togglePostLike(postID))}
    />
  );
}

Heart.propTypes = {
  postID: PropTypes.string.isRequired,
  postLikes: PropTypes.array.isRequired,
};

export default Heart;

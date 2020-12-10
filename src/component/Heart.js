import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { togglePostLike } from '../redux/actions';
import '../style/heart.css';

function Heart({ id, likes, isfrom }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLiked = user ? likes.includes(user.uid) : false;

  return (
    <div
      className={`heart${isLiked ? ' heart-like' : ''}`}
      onClick={() => dispatch(togglePostLike(id, isfrom))}
    />
  );
}

Heart.propTypes = {
  id: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  isfrom: PropTypes.string.isRequired,
};

export default Heart;

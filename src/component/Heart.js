import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { togglePostLike } from '../redux/actions/postAction';
import '../style/heart.css';

function Heart({ id, likes, isfrom }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLiked = user ? likes.includes(user.uid) : false;
  const heartRef = React.useRef(null);
  const heartClick = () => {
    if (isLiked) {
      heartRef.current.className = ' HeartAnimation';
    } else {
      heartRef.current.className = ' HeartAnimation animate';
    }
  };

  return (
    <>
      {isLiked ? (
        <div
          className='HeartAnimation animate'
          ref={heartRef}
          onClick={() => {
            dispatch(togglePostLike(id, isfrom));
            heartClick();
          }}></div>
      ) : (
        <div
          className='HeartAnimation'
          ref={heartRef}
          onClick={() => {
            dispatch(togglePostLike(id, isfrom));
            heartClick();
          }}></div>
      )}
    </>
  );
}

Heart.propTypes = {
  id: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  isfrom: PropTypes.string.isRequired,
};

export default Heart;

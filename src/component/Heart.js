import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { togglePostLike } from '../redux/actions';
import '../style/heart.css';

function Heart({ id, likes, isfrom }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isLiked = user ? likes.includes(user.uid) : false;
  const heartRef = React.useRef(null);
  console.log(likes);
  console.log(isLiked);
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
          }}>
          OOO
        </div>
      ) : (
        <div
          className='HeartAnimation'
          ref={heartRef}
          onClick={() => {
            dispatch(togglePostLike(id, isfrom));
            heartClick();
          }}>
          XXX
        </div>
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

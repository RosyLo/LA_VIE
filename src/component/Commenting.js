import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/actions';
import PropTypes from 'prop-types';

function Commenting({ postID }) {
  const [newComment, setNewCommment] = useState('');
  const dispatch = useDispatch();

  return (
    <form
      className='commenting'
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addComment(postID, newComment));
        setNewCommment('');
      }}>
      <input
        value={newComment}
        type='text'
        id='commenting'
        name='text'
        autoComplete='off'
        onChange={(e) => {
          setNewCommment(e.target.value);
        }}></input>
    </form>
  );
}

Commenting.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default Commenting;

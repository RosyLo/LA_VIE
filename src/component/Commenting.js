import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/actions';
import PropTypes from 'prop-types';
import styles from '../style/post.module.css';
import { nanoid } from 'nanoid';

function Commenting({ postID }) {
  const [newComment, setNewCommment] = useState('');
  const dispatch = useDispatch();

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addComment(postID, newComment));
        setNewCommment('');
      }}>
      <input
        value={newComment}
        type='text'
        id={nanoid()}
        name='text'
        autoComplete='off'
        placeholder='Reply...'
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

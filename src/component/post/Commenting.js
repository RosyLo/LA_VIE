import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../redux/actions/commentAction';
import styles from '../../style/post.module.scss';
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
        className={styles.commentInput}
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

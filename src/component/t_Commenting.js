import { React, useState } from 'react';
import PropTypes from 'prop-types';

const Commenting = (props) => {
  console.log(props);
  const [newComment, setNewCommment] = useState('');
  const [newCommentFirebase, setNewCommentFirebase] = useState({});
  function handleCommentSubmit(e) {
    e.preventDefault();
    if (newComment) {
      console.log(newComment);
      props.addComment(newComment);
      setNewCommment('');
    } else {
      alert('no input');
    }
  }

  return (
    <form className='commenting' onSubmit={handleCommentSubmit}>
      <input
        value={newComment}
        type='text'
        id='commenting'
        className='commentinginput'
        name='text'
        autoComplete='off'
        onChange={(e) => {
          setNewCommment(e.target.value);
        }}></input>
    </form>
  );
};

Commenting.propTypes = {
  addComment: PropTypes.func.isRequired,
  commentIssuerID: PropTypes.string.isRequired,
  commentIssuerImage: PropTypes.string.isRequired,
  newComment: PropTypes.string.isRequired,
  commentIssuerName: PropTypes.string.isRequired,
  postID: PropTypes.string.isRequired,
};

export default Commenting;

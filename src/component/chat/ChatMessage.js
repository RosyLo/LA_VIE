import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase, { auth } from '../../firebase';

function ChatMessage({ message }) {
  console.log(message);
  const { text, uid, photoURL } = message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
    </>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
};

export default ChatMessage;

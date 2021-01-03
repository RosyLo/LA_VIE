import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
// import styles from '../style/chat.module.css';

function Chat() {
  return (
    <>
      <div styles={{ display: 'flex' }}>
        <ChatList />
        <ChatRoom />
      </div>
    </>
  );
}

export default Chat;

// import React, { useState } from 'react';
// import ChatMessage from './ChatMessage';
// import styles from '../style/chatroom.module.css';
// import '../style/chatroom.css';
// import PropTypes from 'prop-types';
// import firebase, { auth } from '../firebase';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

// function ChatRoom() {
//   console.log('chatqwe');
//   const dummy = React.useRef();
//   const db = firebase.firestore();
//   const messagesRef = db.collection('messages');
//   const query = messagesRef.orderBy('createdAt').limit(25);

//   const [messages] = useCollectionData(query, { idField: 'id' });

//   const [formValue, setFormValue] = useState('');

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     const { uid, photoURL } = auth.currentUser;

//     await messagesRef.add({
//       text: formValue,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//       uid,
//       photoURL,
//     });

//     setFormValue('');
//     dummy.current.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <>
//       {/* <div className={styles.chatRoomWrap}>
//         {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
//         <span ref={dummy}></span>
//       </div> */}
//       <div className={styles.chatRoomWrap}>
//         {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
//         <span ref={dummy}></span>

//         <form onSubmit={sendMessage}>
//           <input
//             value={formValue}
//             onChange={(e) => setFormValue(e.target.value)}
//             placeholder='say something nice'
//           />
//           1234567
//           <button type='submit' disabled={!formValue}>
//
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default ChatRoom;

import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

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

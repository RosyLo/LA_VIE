import { useSelector } from 'react-redux';
import '../../style/nomatch.css';

function NoMatch() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className='noMatch'>
        <div className='noMatchTitle'> I wanna go to : </div>
        <button
          className='noMatchBtn'
          onClick={() => {
            window.location = './';
          }}>
          Welcome
        </button>
        <button
          className='noMatchBtn'
          onClick={() => {
            window.location = './main';
          }}>
          Main
        </button>
        <button
          className='noMatchBtn'
          onClick={() => {
            window.location = `./profile?id=${user.uid}`;
          }}>
          Profile
        </button>
      </div>
    </>
  );
}

export default NoMatch;

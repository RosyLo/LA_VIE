import { React } from 'react';
import Logo from './Logo';
import '../style/loading.css';

function Loading() {
  return (
    <div className='loading'>
      Loading...
      <br />
      <br />
      <Logo />
    </div>
  );
}

export default Loading;

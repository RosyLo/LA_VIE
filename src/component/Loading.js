import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/actions';
import PropTypes from 'prop-types';
import '../style/loading.css';
import { nanoid } from 'nanoid';
import Logo from './Logo';

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

Loading.propTypes = {
  postID: PropTypes.string.isRequired,
};

export default Loading;

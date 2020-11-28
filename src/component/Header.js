import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from '../style/header.css';
import 'firebase/auth';
import { signInWithFacebook, auth } from './firebase';
import handleUploadPic from './handleUploadPic';

const Header = (props) => {
  {
    console.log(props);
    const signInButton = (
      <button
        onClick={() => {
          signInWithFacebook(props.setCurrentUser);
        }}>
        Login
      </button>
    );
    const logoutButton = (
      <button
        onClick={() => {
          auth.signOut();
          localStorage.clear();
          props.setCurrentUser(null);
        }}>
        LogOut
      </button>
    );
    return (
      <div className='headerWrap'>
        HEADER
        <div>
          <h1>Welcome to My Awesome App</h1>
          <div id='firebaseui-auth-container'></div>
          <div id='loader'>Loading...</div>
        </div>
        <div className='loginButton'>{props.currentUser ? logoutButton : signInButton}</div>
        <div className='uploadPostButton'>
          <input
            type='file'
            id='uploadPictureButton'
            // value='uploadPicture'
            onChange={props.handlePictureChange}
          />
          <button onClick={props.uploadPic}>Upload</button>
        </div>
      </div>
    );
  }
};

Header.propTypes = {
  handlePictureChange: PropTypes.func,
  handleUploadPic: PropTypes.func,
  uploadPic: PropTypes.func,
  setCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
};

export default Header;

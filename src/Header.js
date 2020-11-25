import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/firebaseui';

function Header(props) {
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      // List of OAuth providers supported.
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: ['public_profile', 'email'],
      },
    ],
  });

  const handleLoginClick = () => {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          console.log(authResult);
          console.log(redirectUrl);
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          console.log('uiShown');
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '<url-to-redirect-to-on-success>',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>',
      // Privacy policy url.
      privacyPolicyUrl: '<your-privacy-policy-url>',
    };
    this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  };

  return (
    <div className='headerWrap'>
      HEADER
      <div>
        <h1>Welcome to My Awesome App</h1>
        <div id='firebaseui-auth-container'></div>
        <div id='loader'>Loading...</div>
      </div>
      <div className='loginButton'>
        <button onClick={handleLoginClick}>Login</button>
      </div>
      <div className='uploadPostButton'>
        <input
          type='file'
          id='uploadPictureButton'
          // value='uploadPicture'
          onChange={props.handlePictureChange}
        />
        <button onClick={props.handleUploadPic}>Upload</button>
      </div>
    </div>
  );
}

Header.propTypes = {
  handlePictureChange: PropTypes.func,
  handleUploadPic: PropTypes.func,
};

export default Header;

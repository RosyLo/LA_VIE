import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UploadPostButton from './UploadPostButton';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import PropTypes from 'prop-types';
import '../style/header.css';
import { login, logout, addPost } from '../redux/actions';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <nav>
      <Logo />
      {/* 登入登出 */}
      <div className='loginButton'>
        {user ? (
          <>
            <span>{user.displayName}</span>
            <button onClick={() => dispatch(logout())}>LogOut</button>
          </>
        ) : (
          <button onClick={() => dispatch(login())}>Login</button>
        )}
      </div>
      {user ? <UploadPostButton /> : ''}
      {/* 個人頁面 */}
      {user ? (
        <Link to={`/profile_${user.uid}`}>profileImage</Link>
      ) : (
        <Link to='/welcome'>profileImage_not login</Link>
      )}
    </nav>
  );
};

Header.propTypes = {
  handlePictureChange: PropTypes.func,
  handleUploadPic: PropTypes.func,
  uploadPic: PropTypes.func,
  setCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
};

export default Header;

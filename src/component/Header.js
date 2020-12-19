import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UploadPostButton from './UploadPostButton';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import SearchTags from './SearchTags';
import PropTypes from 'prop-types';
import '../style/header.module.css';
import { login, logout, addPost } from '../redux/actions';
import ProfileImage from './ProfileImage';
import { StyleEditBlock } from './EditBlockCompo';
import arrow from '../img/arrow.png';
import styles from '../style/header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isProfileToggleClick, setisProfileToggleClick] = useState(false);

  return (
    <nav>
      <div className={styles.navWrap}>
        <div style={{ border: 'none' }}>
          <Link to='/main'>
            <Logo />
          </Link>
        </div>
        <SearchTags />
        {/* 登入登出 */}
        {user ? (
          <>
            <UploadPostButton />
            {/* 頭貼 */}

            <Link to={(location) => `/profile?id=${user.uid}`}>
              {' '}
              <ProfileImage />
            </Link>

            {/* Toggle */}
            <img
              style={{ width: '12px', height: '12px', cursor: 'pointer' }}
              src={arrow}
              onClick={() => {
                setisProfileToggleClick(!isProfileToggleClick);
              }}></img>

            {isProfileToggleClick ? (
              <StyleEditBlock
                show={isProfileToggleClick}
                handleClose={() => {
                  setisProfileToggleClick(!isProfileToggleClick);
                }}>
                <div
                  className='deletePost'
                  onClick={() => {
                    dispatch(logout());
                  }}>
                  LogOut
                </div>
              </StyleEditBlock>
            ) : (
              ''
            )}
          </>
        ) : (
          <>
            <Link to='/main'></Link>
            <div className={styles.button} onClick={() => dispatch(login())}>
              Login
            </div>
            <Link to='/main'>
              {' '}
              <div className={styles.button}>Visit</div>
            </Link>
          </>
        )}
      </div>
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

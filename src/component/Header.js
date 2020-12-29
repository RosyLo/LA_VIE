import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UploadPostButton from './UploadPostButton';
import { LogOutPopup } from './LogOutPopup';
import { Link, Redirect } from 'react-router-dom';
import Logo from './Logo';
import SearchTags from './SearchTags';
import PropTypes from 'prop-types';
import '../style/header.module.css';
import { login, logout } from '../redux/actions/loginAction';
import ProfileImage from './ProfileImage';

import arrow from '../img/downarrow.svg';
import google from '../img/google.png';
import facebook from '../img/facebookt.png';
import styles from '../style/header.module.css';
import { PostLoginPopup } from './PostLoginPopup';
import ChatRoom from './ChatRoom';
import travel from '../img/travel.jpg';

import { useHistory } from 'react-router';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isProfileToggleClick, setisProfileToggleClick] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const history = useHistory();
  return (
    <>
      <div className={styles.headerWrap}>
        <nav>
          <div className={styles.navWrap}>
            <div style={{ border: 'none' }}>
              {user ? (
                <Link to='/main'>
                  <Logo />
                </Link>
              ) : (
                <Link to='/'>
                  <Logo />
                </Link>
              )}
            </div>
            {history.location.pathname === '/' ? (
              <div className={styles.search} styles={{ zIndex: '10000' }}></div>
            ) : (
              <SearchTags />
            )}
            {user ? (
              <>
                <h1>⚛️🔥💬</h1>
                {/* <section>{user && <ChatRoom /> }</section> */}
                <UploadPostButton />
                {/* 頭貼 */}

                {/* <Link to={(location) => `/profile?id=${user.uid}`}> */}
                <Link
                  to={{
                    pathname: '/profile',
                    search: `?id=${user.uid}`,
                  }}>
                  {' '}
                  <ProfileImage />
                </Link>
                {/* </Link> */}

                {/* Toggle */}
                <img
                  className={styles.downarrow}
                  src={arrow}
                  onClick={() => {
                    setisProfileToggleClick(!isProfileToggleClick);
                  }}></img>

                {isProfileToggleClick ? (
                  <LogOutPopup
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
                  </LogOutPopup>
                ) : (
                  ''
                )}
              </>
            ) : (
              <>
                <div className={styles.button} onClick={() => setLoginPopup(true)}>
                  Login
                </div>
                <Link to='/main' style={{ textDecoration: 'none' }}>
                  {' '}
                  <div className={styles.button}>Visit</div>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      <PostLoginPopup
        show={loginPopup}
        handleClose={() => {
          setLoginPopup(false);
        }}>
        <div className={styles.loginPopContain}>
          <div className={styles.loginTitle}>
            <img src={travel}></img>
          </div>
          <div className={styles.loginWrap}>
            <Logo />
            <br />
            <div className={styles.title1}> Share your life in</div>
            <div className={styles.title2}> LA VIE</div>
            <br />
            <br />
            <div className={styles.text}> Login with</div>
            <div className={styles.google} onClick={() => dispatch(login('google', setLoginPopup))}>
              {' '}
              {/* <img src={google} className={styles.googleIcon} /> */}
              Google Login
            </div>

            <div className={styles.text}> OR</div>
            <div
              className={styles.facebook}
              onClick={() => dispatch(login('facebook', setLoginPopup))}>
              Facebook Login
            </div>
          </div>
        </div>
      </PostLoginPopup>
    </>
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

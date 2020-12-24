import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UploadPostButton from './UploadPostButton';
import { LogOutPopup } from './LogOutPopup';
import { Link, Redirect } from 'react-router-dom';
import Logo from './Logo';
import SearchTags from './SearchTags';
import PropTypes from 'prop-types';
import '../style/header.module.css';
import { login, logout, addPost, loginGoogle } from '../redux/actions';
import ProfileImage from './ProfileImage';
import { StyleEditBlock } from './EditBlockCompo';
import arrow from '../img/arrow.png';
import google from '../img/google.png';
import facebook from '../img/facebookt.png';
import styles from '../style/header.module.css';
import { WelcomePopup } from './WelcomePopup';
import travel from '../img/travel.jpg';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isProfileToggleClick, setisProfileToggleClick] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);

  return (
    <>
      <nav>
        <div className={styles.navWrap}>
          <div style={{ border: 'none' }}>
            <Link to='/main'>
              <Logo />
            </Link>
          </div>
          <SearchTags />
          {user ? (
            <>
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
                style={{ width: '12px', height: '12px', marginLeft: '10px', cursor: 'pointer' }}
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
              {/* <div className={styles.button} onClick={() => dispatch(login())}> */}
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

      <WelcomePopup
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
            <div className={styles.google} onClick={() => dispatch(loginGoogle())}>
              {' '}
              <img src={google} className={styles.googleIcon} />
              oogle Login
            </div>

            <div className={styles.text}> OR</div>
            <div className={styles.facebook} onClick={() => dispatch(login())}>
              <img src={facebook} className={styles.facebookIcon} /> acebook Login
            </div>
          </div>
        </div>
      </WelcomePopup>
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

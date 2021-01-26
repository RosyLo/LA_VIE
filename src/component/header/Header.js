import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import UploadPostButton from '../common/UploadPostButton';
import { BarPopup } from '../common/BarPopup';
import Logo from '../common/Logo';
import ChatRoom from '../chat/ChatRoom';
import SearchTags from '../common/SearchTags';
import { LoginPopup } from '../common/LoginPopup';
import ProfileImage from '../header/ProfileImage';
import { login, logout } from '../../redux/actions/loginAction';
import arrow from '../../img/downarrow.svg';
import styles from '../../style/header.module.scss';
import '../../style/header.module.scss';
import travel from '../../img/travel.jpg';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isProfileToggleClick, setisProfileToggleClick] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const history = useHistory();
  const [isChatRoomOpen, setIsChatRoomOpen] = useState(false);
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
                <Link
                  to={{
                    pathname: '/chatroom',
                    search: `?id=${user.uid}`,
                  }}>
                  {/* <h1>⚛️🔥💬</h1> */}
                </Link>

                <UploadPostButton />
                {/* 頭貼 */}

                <Link
                  to={{
                    pathname: '/profile',
                    search: `?id=${user.uid}`,
                  }}>
                  <ProfileImage />
                </Link>
                <img
                  className={styles.downarrow}
                  src={arrow}
                  onClick={() => {
                    setisProfileToggleClick(!isProfileToggleClick);
                  }}></img>

                {isProfileToggleClick ? (
                  <BarPopup
                    show={isProfileToggleClick}
                    top='75px'
                    right='0px'
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
                  </BarPopup>
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
                  <div className={styles.button}>Visit</div>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      <div style={{ width: '100%', height: '130px' }}></div>
      <LoginPopup
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
              Google Login
            </div>

            <div className={styles.text}> Or</div>
            <div
              className={styles.facebook}
              onClick={() => dispatch(login('facebook', setLoginPopup))}>
              Facebook Login
            </div>
          </div>
        </div>
      </LoginPopup>
      {/* {isChatRoomOpen && <ChatRoom />} */}
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

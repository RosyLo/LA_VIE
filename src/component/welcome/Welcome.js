import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import Post from '../post/Post';
import Loading from '../common/Loading';
import Logo from '../common/Logo';
import { LoginPopup } from '../common/LoginPopup';
import { fetchWelcomePosts } from '../../redux/actions/postAction';
import { login } from '../../redux/actions/loginAction';
import headerstyle from '../../style/header.module.css';
import styles from '../../style/post.module.css';
import '../../style/welcome.css';
import '../../style/welcomeshow.css';
import travel from '../../img/travel.jpg';

function Welcome() {
  const dispatch = useDispatch();
  const slogans = [
    {
      tag: 'OUTFIT',
      tagName: 'STUNNING OUTFIT',
      backgroundColor: 'rgb(187,140,47)',
      backgroundImage: '#cfc1ae',
    },
    {
      tag: 'TRAVEL',
      tagName: 'AMAZING VACATION',
      backgroundColor: 'rgb(86, 181, 183)',
      backgroundImage: '#fbde90',
      // 114, 202, 232
    },
    {
      tag: 'FOODIE',
      tagName: 'CHRISTMAS DINNER',
      backgroundColor: 'rgb(106, 138,106)',
      backgroundImage: '#b3cd8f',
    },
  ];

  const handleScroll = () => {
    if (window.pageYOffset > 400) {
      resetTimeout();
    } else slideTime();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchWelcomePosts());
    window.onscroll = () => {
      handleScroll();
    };
    return () => {
      window.onscroll = '';
    };
  }, []);

  //get welcome posts
  const welcomeposts = useSelector((state) => state.welcomeposts);

  //loading
  const loading = useSelector((state) => state.loading);
  const [pleaseLogin, setPleaseLogin] = useState(false);
  const [isPostClick, setisPostClick] = useState(false);
  const stakeGridRef = React.useRef(null);

  //slide show
  const delay = 5000;
  const [index, setIndex] = React.useState(0);
  const [isTo2, setIsTo2] = useState(true);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const slideTime = () => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) => {
          if (prevIndex === 1 && isTo2) {
            setIsTo2(false);
            return 2;
          } else if (prevIndex === 1) {
            setIsTo2(true);
            return 0;
          } else if (prevIndex === 0) {
            return 1;
          } else if (prevIndex == 2) {
            return 1;
          }
        }),
      delay,
    );
    return () => {
      resetTimeout();
    };
  };
  useEffect(() => {
    slideTime();
  }, [index]);

  const filteredPosts = welcomeposts.filter((post) => {
    if (index === 0) return post.postTag.value === 'OUTFIT';
    if (index === 1) return post.postTag.value === 'TRAVEL';
    if (index === 2) return post.postTag.value === 'FOODIE';
  });
  return (
    <>
      {loading === false ? (
        <div
          className='slideshow'
          onClick={() => {
            resetTimeout();
          }}>
          <div
            className='slideshowSlider'
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
            {slogans.map((slogan, index) => (
              <div className='slide' key={index}>
                <div className='welcomeShow'>
                  <div>Share Your</div>

                  <div className='welcomeShowTag'>
                    <div
                      className='tagNameLine'
                      style={{ backgroundColor: slogan.backgroundImage }}></div>
                    <div className='tagNameText' style={{ color: slogan.backgroundColor }}>
                      {slogan.tagName}
                    </div>
                    <div
                      style={{
                        width: '35px',
                        height: '35px',
                        position: 'absolute',
                        right: '150px',
                        top: '-55px',
                      }}></div>
                  </div>
                  <div>with the World</div>
                </div>
                <div className='slideshowDots'>
                  {slogans.map((_, idx) => (
                    <div
                      key={idx}
                      className={`slideshowDot${index === idx ? ' active' : ''}`}
                      onClick={() => {
                        setIndex(idx);
                      }}></div>
                  ))}
                </div>
                <div
                  className='wrap'
                  onClick={() => {
                    setPleaseLogin(true);
                  }}>
                  <div className='postWrap'>
                    <StackGrid
                      gridRef={(e) => (stakeGridRef.current = e)}
                      columnWidth={300}
                      gutterWidth={33}
                      gutterHeight={30}
                      duration={0}
                      monitorImagesLoaded={true}>
                      {filteredPosts.map((post) => (
                        <Post key={post.postID} post={post} isfromWelcome={true} />
                      ))}
                    </StackGrid>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      {slideTime && (
        <LoginPopup
          show={pleaseLogin}
          handleClose={() => {
            setPleaseLogin(false);
          }}
          slideTime={slideTime}>
          <div className={headerstyle.loginPopContain}>
            <div className={headerstyle.loginTitle}>
              <img src={travel}></img>
            </div>
            <div className={headerstyle.loginWrap}>
              <Logo />
              <br />
              <div className={headerstyle.title1}> Share your life in</div>
              <div className={headerstyle.title2}> LA VIE</div>
              <br />
              <br />
              <div className={headerstyle.text}> Login with</div>
              <div
                className={headerstyle.google}
                onClick={() => dispatch(login('google', setPleaseLogin, setisPostClick))}>
                Google Login
              </div>

              <div className={headerstyle.text}> OR</div>
              <div
                className={headerstyle.facebook}
                onClick={() => dispatch(login('facebook', setPleaseLogin, setisPostClick))}>
                Facebook Login
              </div>
            </div>
          </div>
        </LoginPopup>
      )}
    </>
  );
}

export default Welcome;

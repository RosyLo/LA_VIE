import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import Post from '../post/Post';
import Loading from '../common/Loading';
import Logo from '../common/Logo';
import Dot from './Dot';
import { LoginPopup } from '../common/LoginPopup';
import { fetchWelcomePosts } from '../../redux/actions/postAction';
import { login } from '../../redux/actions/loginAction';
import headerstyle from '../../style/header.module.scss';
import styles from '../../style/post.module.scss';
import '../../style/welcome.scss';
import '../../style/welcomeshow.scss';
import travel from '../../img/travel.jpg';

function Welcome() {
  const dispatch = useDispatch();
  //get welcome posts
  const welcomeposts = useSelector((state) => state.welcomeposts);

  //loading
  const loading = useSelector((state) => state.loading);
  const [pleaseLogin, setPleaseLogin] = useState(false);
  const [isPostClick, setisPostClick] = useState(false);
  const stakeGridRef = useRef(null);

  //slide show
  const delay = 5000;
  const [index, setIndex] = useState(0);
  const [isTo2, setIsTo2] = useState(true);
  const timeoutRef = useRef(null);

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
    },
    {
      tag: 'FOODIE',
      tagName: 'CHRISTMAS DINNER',
      backgroundColor: 'rgb(106, 138,106)',
      backgroundImage: '#b3cd8f',
    },
  ];

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

  useEffect(() => {
    slideTime();
  }, [index]);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  const handleScroll = () => {
    if (window.pageYOffset > 400) {
      resetTimeout();
    } else slideTime();
  };

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
          } else if (prevIndex === 2) {
            return 1;
          }
        }),
      delay,
    );
    return () => {
      resetTimeout();
    };
  };

  const filteredPosts = welcomeposts.filter((post) => {
    if (index === 0) return post.postTag.value === 'OUTFIT';
    if (index === 1) return post.postTag.value === 'TRAVEL';
    if (index === 2) return post.postTag.value === 'FOODIE';
  });
  return (
    <>
      {loading === false ? (
        <div className='slideshow'>
          <Dot slogans={slogans} index={index} setIndex={setIndex} />
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

                <div
                  className='wrap'
                  onClick={() => {
                    setPleaseLogin(true);
                  }}>
                  <div className='postWrap'>
                    <StackGrid
                      onClick={() => {
                        resetTimeout();
                      }}
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

              <div className={headerstyle.text}>Or</div>
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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WelcomeShow from './WelcomeShow';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import '../style/welcome.css';
import firebase from '../firebase';
import styles from '../style/post.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/actions';
import Loading from './Loading';
import { RECIEVING_LOADING } from '../redux/actionTypes';

function Welcome() {
  const slogans = [
    {
      tag: 'OUTFIT',
      tagName: '穿搭',
      backgroundColor: 'rgb(187,140,47)',
    },
    {
      tag: 'TRAVEL',
      tagName: '旅行',
      backgroundColor: 'rgb(114, 202, 232)',
      // 114, 202, 232
    },
    {
      tag: 'FOODIE',
      tagName: '美食',
      backgroundColor: 'green',
    },
  ];

  //loading
  const loading = useSelector((state) => state.loading);

  //posts
  const [displayPosts, setDisplayPosts] = useState([]);
  const db = firebase.firestore();
  const postsList = [];
  useEffect(() => {
    db.collection('Post')
      .orderBy('postTime', 'desc')
      .get()
      .then((snap) => {
        snap.forEach((post) => {
          const postData = {
            postID: post.id,
            postImage: post.data().postImage,
            postIssuer: post.data().postIssuer,
            postMessage: post.data().postMessage,
            postTag: post.data().postTag,
            postLikes: post.data().postLikes || [],
            postTime: post.data().postTime,
          };
          if (typeof postData.postTime !== 'string') {
            let date = postData.postTime.toDate();
            let shortTime = date.toDateString();
            postData.postTime = shortTime;
          }
          postsList.push(postData);
        });
        return postsList;
      })
      .then((postsList) => {
        setDisplayPosts(postsList);
        dispatch({ type: RECIEVING_LOADING, payload: false });
      });
  }, []);

  const delay = 8000;
  const [index, setIndex] = React.useState(0);
  const [isTo2, setIsTo2] = useState(true);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
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
  }, [index]);

  const posts = useSelector((state) => state.posts);
  const [lastSnap, setLastSnap] = useState('');
  const [lastVisible, setLastVisible] = useState(0);
  const stakeGridRef = React.useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts(lastVisible, lastSnap, setLastSnap));
  }, [dispatch]);
  const [topOrButton, seTopOrButton] = useState('top');
  useEffect(() => {
    const handleScroll = () => {
      if (topOrButton === 'top') {
        seTopOrButton('button');
      } else if (topOrButton === 'button') {
        seTopOrButton('top');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // filter((post) => post.type === 'food');
  const filteredPosts = displayPosts.filter((post) => {
    if (index === 0) return post.postTag.value === 'OUTFIT';
    if (index === 1) return post.postTag.value === 'TRAVEL';
    if (index === 2) return post.postTag.value === 'FOODIE';
  });

  return (
    <>
      {loading === false ? (
        <div className='slideshow'>
          <div
            className='slideshowSlider'
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
            {slogans.map((slogan, index) => (
              <div className='slide' key={index}>
                <div className='welcomeShow'>
                  <div>分享你的</div>
                  <div className='welcomeShowTag' style={{ color: slogan.backgroundColor }}>
                    {slogan.tagName}
                  </div>
                  <div>精彩生活</div>
                </div>
                <div className='slideshowDots'>
                  {slogans.map((_, idx) => (
                    <div
                      key={idx}
                      className={`slideshowDot${index === idx ? ' active' : ''}`}
                      // className={`slideshowDot${index === idx ? " active" : ""}`}
                      onClick={() => {
                        setIndex(idx);
                      }}></div>
                  ))}
                </div>
                <div className='wrap'>
                  <div className='postWrap'>
                    <StackGrid
                      gridRef={(e) => (stakeGridRef.current = e)}
                      columnWidth={300}
                      gutterWidth={33}
                      gutterHeight={30}
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
          {' '}
          <Loading />
        </div>
      )}
    </>
  );

  // return (
  //   <>
  //     {/* <WelcomeShow />
  //     <StackGrid columnWidth={300} gutterWidth={30} gutterHeight={30} monitorImagesLoaded={true}>
  //       {posts.map((post) => (
  //         <Post key={post.postID} post={post} isfromWelcome={true} />
  //       ))}
  //     </StackGrid> */}
  //   </>
  // );
}

export default Welcome;

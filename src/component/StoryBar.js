import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from '../firebase';
import { fetchStories } from '../redux/actions/storyAction';
import { useSelector, useDispatch } from 'react-redux';
import StoryCircle from '../component/StoryCircle';
import MakeStory from '../component/MakeStory';
import styles from '../style/storybar.module.css';
import plus from '../img/plusIcon.png';
import rightarrow from '../img/right-arrow.png';
import leftarrow from '../img/left-arrow.png';
import Loading from './Loading';
import { MsgPopup } from './MsgPopup';
import styled from '../style/popup.module.css';
import msgPopStyles from '../style/msgPopWrap.module.css';
import UploadPostButton from './UploadPostButton';

function StoryBar({ paramsID }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const stories = useSelector((state) => state.stories);
  // const masterposts = useSelector((state) => state.masterposts);
  const posts = useSelector((state) => state.posts);
  const [isMakeStoryClick, setisMakeStoryClick] = useState(false);
  const [isMakeStorySuccess, setisMakeStorySucces] = useState(false);
  const containRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const barLeftArrowRef = React.useRef(null);
  const barRightArrowRef = React.useRef(null);
  const circleRef = React.useRef(null);

  const [constainMargin, setconstainMargin] = useState(0);

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => setIsLoading(false), 3000);
  // }, [stories]);
  console.log(posts);
  const loading = useSelector((state) => state.loading);
  //stories 慢，判斷完了
  // let targetElement;
  useEffect(() => {
    console.log('start');
    if (posts.length > 0) {
      // console.log('postlength');
      // console.log(barLeftArrowRef);
      // if (barLeftArrowRef) {
      //   barLeftArrowRef.current.style.display = 'none';
      // }
      // barRightArrowRef.current.style.display = 'none';
      console.log(paramsID);
      dispatch(fetchStories(paramsID));
    }
    // targetElement = document.querySelector('#portal');
  }, [posts]);

  useEffect(() => {
    if (barRightArrowRef.current && barRightArrowRef.current) {
      barRightArrowRef.current.style.display = 'none';
      barLeftArrowRef.current.style.display = 'none';
      if (stories.length > 3) {
        console.log('here');
        console.log(stories.length);
        barRightArrowRef.current.style.display = 'block';
      }
    }
  }, [stories]);

  const storyBarScrollLeft = () => {
    console.log('rightarrow');
    let circleWidth = circleRef.current.clientWidth;
    if (containRef.current.clientWidth > wrapRef.current.clientWidth) {
      let newconstainMargin = constainMargin - circleWidth;
      setconstainMargin(newconstainMargin);
      containRef.current.style.transform = `translateX(${newconstainMargin}px)`;
      containRef.current.style.transition = 'transform 1s ease-in-out';
      barLeftArrowRef.current.style.display = 'block';
      if (
        -constainMargin + wrapRef.current.clientWidth + circleWidth >=
        containRef.current.clientWidth
      ) {
        barRightArrowRef.current.style.display = 'none';
        barLeftArrowRef.current.style.display = 'block';
      }
    }
  };

  const storyBarScrollRight = () => {
    console.log(wrapRef.current.clientWidth);
    console.log(containRef.current.clientWidth);
    let circleWidth = circleRef.current.clientWidth;
    if (containRef.current.clientWidth > wrapRef.current.clientWidth) {
      let newconstainMargin = constainMargin + circleWidth;
      setconstainMargin(newconstainMargin);
      containRef.current.style.transform = `translateX(${newconstainMargin}px)`;
      containRef.current.style.transition = 'transform 1s ease-in-out';
      if (user.uid === paramsID) {
        console.log(-constainMargin);
        console.log(wrapRef.current.clientWidth);
        console.log(containRef.current.clientWidth);
        if (-constainMargin <= circleWidth) {
          console.log(-constainMargin);
          console.log(wrapRef.current.clientWidth);
          console.log(containRef.current.clientWidth);
          barLeftArrowRef.current.style.display = 'none';
          barRightArrowRef.current.style.display = 'block';
        }
      } else {
        if (-constainMargin + wrapRef.current.clientWidth > containRef.current.clientWidth) {
          console.log(-constainMargin);
          console.log(wrapRef.current.clientWidth);
          console.log(containRef.current.clientWidth);
          barLeftArrowRef.current.style.display = 'none';
          barRightArrowRef.current.style.display = 'block';
        }
      }
    }
  };
  console.log(stories);

  return (
    <>
      <div className={styles.wrap}>
        {loading === false ? (
          <div className={styles.storyBarWrap}>
            <div className={styles.storyCircleWrap} ref={wrapRef}>
              <div className={styles.storyCircleContain} ref={containRef}>
                {user.uid === paramsID && posts.length > 0 ? (
                  <div
                    className={styles.storyCircle}
                    onClick={() => {
                      console.log('add');
                      setisMakeStoryClick(true);
                    }}>
                    <img className={styles.storyCirclePlus} src={plus} />
                  </div>
                ) : (
                  ''
                )}
                {posts.length > 0 ? (
                  <>
                    {stories.map((story) => (
                      <StoryCircle key={story.storyID} story={story} circleRef={circleRef} />
                    ))}
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
            {stories.length > 0 ? (
              <>
                <img
                  src={rightarrow}
                  className={styles.barrightarrow}
                  ref={barRightArrowRef}
                  onClick={() => {
                    storyBarScrollLeft();
                  }}
                />
                <img
                  src={leftarrow}
                  className={styles.barleftarrow}
                  ref={barLeftArrowRef}
                  onClick={() => {
                    storyBarScrollRight();
                  }}
                />
              </>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className={styles.loading}></div>
          // <div className={styles.noPostUpload}>
          //   <div className={styles.noPostGuide}>No Posts Yet, Upload My First Post:</div>{' '}
          //   <UploadPostButton />
          // </div>
        )}
      </div>
      {/* make story */}
      <MakeStory
        isMakeStoryClick={isMakeStoryClick}
        setisMakeStoryClick={setisMakeStoryClick}
        setisMakeStorySucces={setisMakeStorySucces}
      />
      {/* MakeStory Success Popup */}
      <MsgPopup
        show={isMakeStorySuccess}
        handleClose={() => {
          setisMakeStorySucces(false);
        }}>
        <div className={msgPopStyles.msgPopWrap}>
          <h2>Update Successful!</h2>
          <div className={msgPopStyles.buttonWrap}>
            <button
              className={styled.decideButton}
              onClick={() => {
                setisMakeStorySucces(false);
              }}>
              OK
            </button>
          </div>
        </div>
      </MsgPopup>
    </>
  );
}

StoryBar.propTypes = {
  paramsID: PropTypes.string.isRequired,
};

export default StoryBar;

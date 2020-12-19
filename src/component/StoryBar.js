import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from '../firebase';
import { fetchStories } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import StoryCircle from '../component/StoryCircle';
import MakeStory from '../component/MakeStory';
import styles from '../style/storybar.module.css';
import plus from '../img/plus.png';
import rightarrow from '../img/right-arrow.png';
import leftarrow from '../img/left-arrow.png';
import Loading from './Loading';
import { MsgPopup } from './MsgPopup';
import styled from '../style/popup.module.css';
import msgPopStyles from '../style/msgPopWrap.module.css';

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, [stories]);

  let targetElement;
  useEffect(() => {
    barLeftArrowRef.current.hidden = true;
    barRightArrowRef.current.hidden = true;
    if (posts.length > 0) {
      dispatch(fetchStories(paramsID));

      if (posts.length > 5) {
        barLeftArrowRef.current.hidden = false;
      }
    }
    targetElement = document.querySelector('#portal');
  }, [posts]);

  const storyBarScrollLeft = () => {
    let circleWidth = circleRef.current.clientWidth;
    if (containRef.current.clientWidth > wrapRef.current.clientWidth) {
      if (-constainMargin + wrapRef.current.clientWidth >= containRef.current.clientWidth) {
        barLeftArrowRef.current.hidden = true;
        barRightArrowRef.current.hidden = false;
      } else {
        let newconstainMargin = constainMargin - circleWidth;
        setconstainMargin(newconstainMargin);
        containRef.current.style.transform = `translateX(${newconstainMargin}px)`;
        containRef.current.style.transition = 'transform 1s ease-in-out';
        barRightArrowRef.current.hidden = false;
      }
    }
  };
  const storyBarScrollRight = () => {
    let circleWidth = circleRef.current.clientWidth;
    if (containRef.current.clientWidth > wrapRef.current.clientWidth) {
      if (constainMargin === 0) {
        barLeftArrowRef.current.hidden = true;
        barRightArrowRef.current.hidden = false;
        console.log('<');
      } else {
        let newconstainMargin = constainMargin + circleWidth;
        setconstainMargin(newconstainMargin);
        containRef.current.style.transform = `translateX(${newconstainMargin}px)`;
        containRef.current.style.transition = 'transform 1s ease-in-out';
        barLeftArrowRef.current.hidden = false;
      }
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.storyBarWrap}>
          <MakeStory
            isMakeStoryClick={isMakeStoryClick}
            setisMakeStoryClick={setisMakeStoryClick}
            setisMakeStorySucces={setisMakeStorySucces}
          />
          <img
            src={rightarrow}
            className={styles.barrightarrow}
            ref={barRightArrowRef}
            onClick={() => {
              storyBarScrollRight();
            }}
          />
          <img
            src={leftarrow}
            className={styles.barleftarrow}
            ref={barLeftArrowRef}
            onClick={() => {
              storyBarScrollLeft();
            }}
          />
          {isLoading === false ? (
            <div className={styles.storyCircleWrap} ref={wrapRef}>
              <div className={styles.storyCircleContain} ref={containRef}>
                <div>
                  {user.uid === paramsID ? (
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
                </div>
                {stories.map((story) => (
                  <StoryCircle key={story.storyID} story={story} circleRef={circleRef} />
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.loading}>{/* <Loading /> */}</div>
          )}
        </div>
      </div>
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

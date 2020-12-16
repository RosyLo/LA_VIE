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
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

function StoryBar({ paramsID }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const stories = useSelector((state) => state.stories);
  console.log(stories);
  const masterposts = useSelector((state) => state.masterposts);
  const [isMakeStoryClick, setisMakeStoryClick] = useState(false);
  const containRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const barLeftArrowRef = React.useRef(null);
  const barRightArrowRef = React.useRef(null);
  const circleRef = React.useRef(null);

  const [constainMargin, setconstainMargin] = useState(0);

  let targetElement;
  useEffect(() => {
    barLeftArrowRef.current.hidden = true;
    barRightArrowRef.current.hidden = true;
    if (masterposts.length > 0) {
      dispatch(fetchStories(paramsID));

      if (masterposts.length > 5) {
        barLeftArrowRef.current.hidden = false;
      }
    }
    targetElement = document.querySelector('#portal');
  }, [masterposts]);

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
    <div className={styles.storyBarWrap}>
      <MakeStory isMakeStoryClick={isMakeStoryClick} setisMakeStoryClick={setisMakeStoryClick} />
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
          console.log('scroll');
          storyBarScrollLeft();
        }}
      />
      <div className={styles.storyCircleWrap} ref={wrapRef}>
        <div className={styles.storyCircleContain} ref={containRef}>
          {stories.map((story) => (
            <StoryCircle key={story.storyID} story={story} circleRef={circleRef} />
          ))}
          <div>
            {user.uid === paramsID ? (
              <img
                className={styles.storyCircle}
                src={plus}
                onClick={() => {
                  setisMakeStoryClick(true);
                  disableBodyScroll(targetElement);
                }}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

StoryBar.propTypes = {
  paramsID: PropTypes.string.isRequired,
};

export default StoryBar;

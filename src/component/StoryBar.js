import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import StoryCircle from '../component/StoryCircle';
import MakeStory from '../component/MakeStory';
import { MsgPopup } from './MsgPopup';
import { fetchStories } from '../redux/actions/storyAction';
import styles from '../style/storybar.module.css';
import msgPopStyles from '../style/msgPopWrap.module.css';
import styled from '../style/popup.module.css';
import plus from '../img/plusIcon.png';
import leftarrow from '../img/left-arrow.png';
import rightarrow from '../img/right-arrow.png';

function StoryBar({ paramsID }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const stories = useSelector((state) => state.stories);
  const posts = useSelector((state) => state.posts);
  const [isMakeStoryClick, setisMakeStoryClick] = useState(false);
  const [isMakeStorySuccess, setisMakeStorySucces] = useState(false);
  const containRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const barLeftArrowRef = React.useRef(null);
  const barRightArrowRef = React.useRef(null);
  const circleRef = React.useRef(null);

  const [constainMargin, setconstainMargin] = useState(0);
  const loading = useSelector((state) => state.loading);
  //stories 慢，判斷完了
  useEffect(() => {
    console.log('start');
    if (posts.length > 0) {
      dispatch(fetchStories(paramsID));
    }
  }, [posts]);

  useEffect(() => {
    if (barRightArrowRef.current && barRightArrowRef.current) {
      barRightArrowRef.current.style.display = 'none';
      barLeftArrowRef.current.style.display = 'none';
      if (stories.length > 3) {
        barRightArrowRef.current.style.display = 'block';
      }
    }
  }, [stories]);

  const storyBarScrollLeft = () => {
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
    let circleWidth = circleRef.current.clientWidth;
    if (containRef.current.clientWidth > wrapRef.current.clientWidth) {
      let newconstainMargin = constainMargin + circleWidth;
      setconstainMargin(newconstainMargin);
      containRef.current.style.transform = `translateX(${newconstainMargin}px)`;
      containRef.current.style.transition = 'transform 1s ease-in-out';
      if (user.uid === paramsID) {
        if (-constainMargin <= circleWidth) {
          barLeftArrowRef.current.style.display = 'none';
          barRightArrowRef.current.style.display = 'block';
        }
      } else {
        if (-constainMargin + wrapRef.current.clientWidth > containRef.current.clientWidth) {
          barLeftArrowRef.current.style.display = 'none';
          barRightArrowRef.current.style.display = 'block';
        }
      }
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        {loading === false ? (
          <div className={styles.storyBarWrap}>
            <div className={styles.storyCircleWrap} ref={wrapRef}>
              <div className={styles.storyCircleContain} ref={containRef}>
                {user.uid === paramsID && posts.length > 0 && (
                  <div
                    className={styles.storyCircle}
                    onClick={() => {
                      setisMakeStoryClick(true);
                    }}>
                    <img className={styles.storyCirclePlus} src={plus} />
                  </div>
                )}
                {posts.length > 0 && (
                  <>
                    {stories.map((story) => (
                      <StoryCircle key={story.storyID} story={story} circleRef={circleRef} />
                    ))}
                  </>
                )}
              </div>
            </div>
            {stories.length > 0 && (
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
            )}
          </div>
        ) : (
          <div className={styles.loading} />
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

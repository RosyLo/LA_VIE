import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from '../firebase';
import { fetchStories } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import StoryCircle from '../component/StoryCircle';
import MakeStory from '../component/MakeStory';
import styles from '../style/storybar.module.css';
import plus from '../img/plus.png';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

function StoryBar({ paramsID }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const stories = useSelector((state) => state.stories);
  const masterposts = useSelector((state) => state.masterposts);
  const [isMakeStoryClick, setisMakeStoryClick] = useState(false);

  let targetElement;
  useEffect(() => {
    if (masterposts.length > 0) {
      dispatch(fetchStories(paramsID));
    }
    targetElement = document.querySelector('#portal');
    console.log(targetElement);
  }, [masterposts]);

  return (
    <div className={styles.storyBarWrap}>
      <MakeStory isMakeStoryClick={isMakeStoryClick} setisMakeStoryClick={setisMakeStoryClick} />
      {stories.map((story) => (
        <StoryCircle key={story.storyID} story={story} />
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
  );
}

StoryBar.propTypes = {
  paramsID: PropTypes.string.isRequired,
};

export default StoryBar;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from '../firebase';
import { fetchStories } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import StoryCircle from '../component/StoryCircle';

import styles from '../style/storybar.module.css';
import plus from '../img/plus.png';

function StoryBar({ paramsID }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const stories = useSelector((state) => state.stories);

  useEffect(() => {
    if (posts.length > 0) {
      dispatch(fetchStories(paramsID));
    }
  }, [posts]);

  return (
    <div className={styles.storyBarWrap}>
      {stories.map((story) => (
        <StoryCircle key={story.storyID} story={story} />
      ))}
      <div>
        <img className={styles.storyCircle} src={plus} />
      </div>
    </div>
  );
}

StoryBar.propTypes = {
  paramsID: PropTypes.string.isRequired,
};

export default StoryBar;

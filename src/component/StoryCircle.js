import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StoryPost from './StoryPost';
import styles from '../style/storybar.module.css';
import plus from '../img/plus.png';

import { useSelector } from 'react-redux';

function StoryCircle({ story }) {
  const { storyImageLink, stories } = story;
  const [isStoryClick, setisStoryClick] = useState(false);
  console.log(story);

  return (
    <>
      <div
        onClick={(e) => {
          setisStoryClick(true);
          e.stopPropagation();
        }}>
        <img className={styles.storyCircle} src={storyImageLink} />
      </div>
      {stories.map((story) => (
        <StoryPost
          key={story.postID}
          story={story}
          isStoryClick={isStoryClick}
          setisStoryClick={setisStoryClick}
        />
      ))}
    </>
  );
}

StoryCircle.propTypes = {
  story: PropTypes.object.isRequired,
};

export default StoryCircle;

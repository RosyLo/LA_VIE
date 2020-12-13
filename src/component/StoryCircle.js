import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StoryPost from './StoryPost';
import styles from '../style/storybar.module.css';
import plus from '../img/plus.png';

import { useSelector } from 'react-redux';

function StoryCircle({ story }) {
  console.log(story);
  const { storyImageLink } = story;
  const [isStoryClick, setisStoryClick] = useState(false);

  return (
    <>
      <div
        className={styles.story}
        onClick={(e) => {
          setisStoryClick(true);
          e.stopPropagation();
        }}>
        <img className={styles.storyCircle} src={storyImageLink} />
        <div className={styles.storyName}>{story.storyName}</div>
      </div>

      <StoryPost
        key={story.postID}
        story={story}
        isStoryClick={isStoryClick}
        setisStoryClick={setisStoryClick}
      />
    </>
  );
}

StoryCircle.propTypes = {
  story: PropTypes.object.isRequired,
};

export default StoryCircle;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stories from 'react-insta-stories';
import { StoryModal } from './StoryModal';
import { useSelector } from 'react-redux';
import rightarrow from '../img/right-arrow.png';
import leftarrow from '../img/left-arrow.png';
import styles from '../style/storybar.module.css';

function StoryPost({ story, isStoryClick, setisStoryClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories = [
    {
      url: 'https://picsum.photos/1080/1920',
      header: {
        heading: 'Mohit Karekar',
        subheading: 'Posted 5h ago',
        profileImage: 'https://picsum.photos/1000/1000',
      },
    },
    {
      url: 'https://picsum.photos/1080/1920',
      header: {
        heading: 'Mohit Karekar',
        subheading: 'Posted 5h ago',
        profileImage: 'https://picsum.photos/1000/1000',
      },
    },
    {
      url: 'https://picsum.photos/1080/1920',
      header: {
        heading: 'Mohit Karekar',
        subheading: 'Posted 5h ago',
        profileImage: 'https://picsum.photos/1000/1000',
      },
    },
  ];

  return (
    <StoryModal
      show={isStoryClick}
      handleClose={() => {
        setisStoryClick(false);
      }}>
      <img
        src={rightarrow}
        className={styles.rightarrow}
        onClick={() => {
          setCurrentIndex(currentIndex + 1);
        }}
      />

      <img
        src={leftarrow}
        className={styles.leftarrow}
        onClick={() => {
          setCurrentIndex(currentIndex - 1);
        }}
      />

      {isStoryClick ? (
        <div style={{ margin: 'auto', width: '420px' }}>
          <Stories
            loop
            keyboardNavigation
            defaultInterval={8000}
            stories={stories}
            onStoryEnd={(s, st) => console.log('story ended', s, st)}
            onAllStoriesEnd={(s, st) => console.log('all stories ended', s, st)}
            onStoryStart={(s, st) => console.log('story started', s, st)}
            currentIndex={currentIndex}
          />
        </div>
      ) : (
        ''
      )}
    </StoryModal>
  );
}

StoryPost.propTypes = {
  story: PropTypes.object.isRequired,
  isStoryClick: PropTypes.bool.isRequired,
  setisStoryClick: PropTypes.func.isRequired,
};

export default StoryPost;

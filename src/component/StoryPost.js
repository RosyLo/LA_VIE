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
      url:
        'https://firebasestorage.googleapis.com/v0/b/c-est-la-vie-data.appspot.com/o/Post%2FpostImageLinkdownload.jpeg?alt=media&token=6eee3854-0c13-42ff-b20f-532ccc7e3118',
      header: {
        heading: 'Mohit Karekar',
        subheading: 'Posted 5h ago',
        profileImage: 'https://picsum.photos/1000/1000',
      },
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/c-est-la-vie-data.appspot.com/o/Post%2FpostImageLinkScreen%20Shot%202020-12-10%20at%203.18.26%20PM.png?alt=media&token=77de46bd-b8d5-4c06-a799-df0e9c28837b',
      header: {
        heading: 'Mohit Karekar',
        subheading: 'Posted 5h ago',
        profileImage: 'https://picsum.photos/1000/1000',
      },
    },
    {
      url:
        'https://firebasestorage.googleapis.com/v0/b/c-est-la-vie-data.appspot.com/o/Post%2FpostImageLinkpic11.png?alt=media&token=2559bfd3-c408-4893-a1dd-e6dc2c37471d',
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

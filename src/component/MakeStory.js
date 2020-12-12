import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../redux/actions';
import { MakeStoryModal } from './MakeStoryModal';
import Image from './Image';
import styles from '../style/popup.module.css';
import Post from './Post';
import ChooseTags from './ChooseTags';
import { nanoid } from 'nanoid';
import StackGrid from 'react-stack-grid';
import styled from '../style/makestory.module.css';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

function MakeStory({ setisMakeStoryClick, isMakeStoryClick }) {
  const [storyName, setstoryName] = useState('');
  const [storyImageLink, setstoryImageLink] = useState('');
  const [stories, setstories] = useState([]);
  const user = useSelector((state) => state.user);
  const masterposts = useSelector((state) => state.masterposts);
  const [makeStoryStage, setMakeStoryStage] = useState(0);

  const story = {
    storyID: '',
    storyName: storyName,
    storyImageLink: storyImageLink,
    storyIssuerID: user.uid,
    createTime: '',
    stories: [],
  };

  //選擇post
  const choosePostTitle = (
    <>
      <div> Choose Posts</div>{' '}
      <button
        className={styles.decideButton}
        onClick={() => {
          setMakeStoryStage(1);
        }}>
        Next
      </button>
    </>
  );
  const [choosedStory, setChoosedStory] = useState([]);
  const choosePost = (
    <>
      <div className={styled.grid}>
        {masterposts.map((post) => (
          <Image
            key={post.postID}
            post={post}
            choosedStory={choosedStory}
            setChoosedStory={setChoosedStory}
          />
        ))}
      </div>
    </>
  );

  const chooseCoverTitle = (
    <>
      <div> Choose Cover Photo</div>{' '}
      <button
        className={styles.decideButton}
        onClick={() => {
          setMakeStoryStage(2);
        }}>
        Next
      </button>
    </>
  );

  const chooseCoverPhoto = (
    <div className={styled.grid}>
      {masterposts.map((post) => (
        <Image
          key={post.postID}
          post={post}
          choosedStory={choosedStory}
          setChoosedStory={setChoosedStory}
        />
      ))}
    </div>
  );

  let title = '';
  let view = '';
  if (makeStoryStage === 0) {
    title = choosePostTitle;
    view = choosePost;
  } else if (makeStoryStage === 1) {
    title = chooseCoverTitle;
    view = chooseCoverPhoto;
  } else if (makeStoryStage === 2) {
    // view = uploadPic;
  }

  return (
    <MakeStoryModal
      show={isMakeStoryClick}
      handleClose={() => {
        setisMakeStoryClick(false);
      }}>
      <div className={styles.modelWrap}>
        <div className={styles.topModel}>{choosePostTitle}</div>
        <div className={styled.buttonModal}>
          <div>{choosePost}</div>
        </div>
      </div>
    </MakeStoryModal>
  );
}

MakeStory.propTypes = {
  isMakeStoryClick: PropTypes.bool.isRequired,
  setisMakeStoryClick: PropTypes.func.isRequired,
};

export default MakeStory;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StoryPost from './StoryPost';
import styles from '../style/storybar.module.css';
import plus from '../img/plus.png';
import cross from '../img/cross.png';
import { useDispatch, useSelector } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { MsgPopup } from './MsgPopup';
import styled from '../style/popup.module.css';
import msgPopStyles from '../style/msgPopWrap.module.css';
import { deleteStory } from '../redux/actions';

function StoryCircle({ story, circleRef }) {
  const { storyImageLink, storyIssuerID } = story;
  const [isStoryClick, setisStoryClick] = useState(false);
  const user = useSelector((state) => state.user);
  const [isStoryDeleteClick, setisStoryDeleteClick] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <div className={styles.story} ref={circleRef}>
        {storyIssuerID === user.uid && (
          <div
            className={styles.deleteStory}
            onClick={() => {
              setisStoryDeleteClick(true);
            }}>
            <img className={styles.storyDeleteCross} src={cross}></img>
          </div>
        )}
        <img
          className={styles.storyCircle}
          src={storyImageLink}
          onClick={(e) => {
            setisStoryClick(true);
            e.stopPropagation();
          }}
        />
        <div className={styles.storyName}>{story.storyName}</div>
      </div>

      <StoryPost
        key={story.postID}
        story={story}
        isStoryClick={isStoryClick}
        setisStoryClick={setisStoryClick}
      />
      <MsgPopup
        show={isStoryDeleteClick}
        handleClose={() => {
          setisStoryDeleteClick(false);
        }}>
        <div className={msgPopStyles.msgPopWrap}>
          <h2>Sure to Deltete ?!</h2>
          <div className={msgPopStyles.buttonWrap}>
            <button
              className={styled.decideButton}
              onClick={() => {
                setisStoryDeleteClick(false);
              }}>
              Cancel
            </button>
            <button
              className={styled.decideButton}
              onClick={() => {
                dispatch(deleteStory(story, setisStoryDeleteClick));
              }}>
              Delete
            </button>
          </div>
        </div>
      </MsgPopup>
    </>
  );
}

StoryCircle.propTypes = {
  story: PropTypes.object.isRequired,
  circleRef: PropTypes.object.isRequired,
};

export default StoryCircle;

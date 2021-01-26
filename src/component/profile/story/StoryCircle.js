import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import StoryPost from './StoryPost';
import { MsgPopup } from '../../common/MsgPopup';
import styled from '../../../style/popup.module.scss';
import styles from '../../../style/storybar.module.scss';
import msgPopStyles from '../../../style/msgPopWrap.module.css';
import { deleteStory } from '../../../redux/actions/storyAction';
import cross from '../../../img/cancel.svg';

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
            <img className={styles.storyDeleteCross} src={cross} />
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
          <h2>Sure to Delete ?</h2>
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

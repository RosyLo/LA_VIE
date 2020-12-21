import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addStory } from '../redux/actions';
import { MakeStoryModal } from './MakeStoryModal';
import Image from './Image';
import styles from '../style/popup.module.css';
import Post from './Post';
import ChooseTags from './ChooseTags';
import { nanoid } from 'nanoid';
import StackGrid from 'react-stack-grid';
import styled from '../style/makestory.module.css';

function MakeStory({ setisMakeStoryClick, isMakeStoryClick, setisMakeStorySucces }) {
  const dispatch = useDispatch();
  const [storyName, setstoryName] = useState('');
  const [choosedCover, setChoosedCover] = useState('');
  const [choosedStory, setChoosedStory] = useState([]);
  const user = useSelector((state) => state.user);
  // const masterposts = useSelector((state) => state.masterposts);
  const posts = useSelector((state) => state.posts);
  const [makeStoryStage, setMakeStoryStage] = useState(0);
  const story = {
    storyID: '',
    storyName: storyName,
    storyImageLink: choosedCover,
    storyIssuerID: user.uid,
    createTime: '',
    stories: choosedStory,
  };
  console.log(choosedStory.length);
  //選擇post
  const choosePostTitle = (
    <>
      <button
        className={styled.decideButton}
        onClick={() => {
          setisMakeStoryClick(false);
        }}>
        Cancel
      </button>
      <div className={styled.makeStoryGuide}> Choose Story Posts</div>{' '}
      {choosedStory.length > 0 && (
        <button
          className={styled.decideButton}
          onClick={() => {
            setMakeStoryStage(1);
          }}>
          Next
        </button>
      )}
    </>
  );

  const chooseStory = (postID) => {
    if (choosedStory.includes(postID)) {
      let newchoosedStory = choosedStory.filter((storyID) => storyID !== postID);
      setChoosedStory(newchoosedStory);
    } else {
      let newchoosedStory = [...choosedStory];
      newchoosedStory.push(postID);
      setChoosedStory(newchoosedStory);
    }
  };

  const choosePost = (
    <>
      <div className={styled.grid}>
        {posts.map((post) => (
          <Image
            key={post.postID}
            post={post}
            choosedStory={choosedStory}
            stage={0}
            chooseStory={() => {
              chooseStory(post.postID);
            }}
          />
        ))}
      </div>
    </>
  );

  //選擇cover image

  const chooseCoverTitle = (
    <>
      {' '}
      <button
        className={styled.decideButton}
        onClick={() => {
          setMakeStoryStage(0);
        }}>
        Back
      </button>
      <div className={styled.makeStoryGuide}> Choose Cover Photo</div>{' '}
      {!choosedCover ? (
        ''
      ) : (
        <button
          className={styled.decideButton}
          onClick={() => {
            setMakeStoryStage(2);
          }}>
          Next
        </button>
      )}
    </>
  );
  const [isCover, setIsCover] = useState('');
  const chooseCoverfunc = (post) => {
    if (post.postImage.postImageLink !== choosedCover) {
      setChoosedCover(post.postImage.postImageLink);
      setIsCover(post.postImage.postImageLink);
    }
  };

  const chooseCoverPhoto = (
    <div className={styled.grid}>
      {posts.map((post) => (
        <Image
          key={post.postID}
          post={post}
          choosedStory={choosedStory}
          choosedCover={choosedCover}
          stage={1}
          chooseCoverfunc={() => chooseCoverfunc(post)}
          isCover={isCover}
        />
      ))}
    </div>
  );

  //Story 命名

  const storyNameingTitle = (
    <>
      <button
        className={styled.decideButton}
        onClick={() => {
          setMakeStoryStage(1);
        }}>
        Back
      </button>
      <div className={styled.makeStoryGuide}> Name Your Story</div>{' '}
      <button
        className={styled.decideButton}
        onClick={(e) => {
          e.preventDefault();
          console.log(story);
          //要dispatch
          dispatch(addStory(story));
          // setMakeStoryStage(2);
          setisMakeStoryClick(false);
          setstoryName('');
          setChoosedCover('');
          setChoosedStory([]);
          setMakeStoryStage(0);
          setisMakeStorySucces(true);
        }}>
        Upload
      </button>
    </>
  );

  const handleMsgChange = (e) => {
    setstoryName(e.target.value);
  };
  const storyNameing = (
    <>
      <div className={styled.storyCircle}>
        {!choosedCover ? '' : <img className={styled.coverImage} src={choosedCover} />}
      </div>
      <form
        className={styles.form}
        style={{ textAlign: 'center' }}
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <input
          type='text'
          id={nanoid()}
          name='text'
          autoComplete='off'
          placeholder='Story Name ...'
          onChange={handleMsgChange}
          className={styled.storyNameInput}></input>
      </form>
    </>
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
    title = storyNameingTitle;
    view = storyNameing;
  }

  return (
    <MakeStoryModal
      show={isMakeStoryClick}
      handleClose={() => {
        setisMakeStoryClick(false);
      }}>
      <div className={styles.modelWrap}>
        <div className={styled.topModel}>{title}</div>
        <div className={styled.buttonModal}>
          <div>{view}</div>
        </div>
      </div>
    </MakeStoryModal>
  );
}

MakeStory.propTypes = {
  isMakeStoryClick: PropTypes.bool.isRequired,
  setisMakeStoryClick: PropTypes.func.isRequired,
  setisMakeStorySucces: PropTypes.func.isRequired,
};

export default MakeStory;

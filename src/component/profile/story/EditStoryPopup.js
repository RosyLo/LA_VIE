import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { edtiStory } from '../../../redux/actions/storyAction';
import { MakeStoryModal } from '../../common/MakeStoryModal';
import EditImage from '../story/EditImage';
import { MsgPopup } from '../../common/MsgPopup';
import styles from '../../../style/popup.module.scss';
import { nanoid } from 'nanoid';
import styled from '../../../style/makestory.module.scss';
import msgPopStyles from '../../../style/msgPopWrap.module.css';

function EditStoryPopup({ setIsEditStoryBlockClick, isEditStoryBlockClick, editStory }) {
  const dispatch = useDispatch();
  const [storyName, setstoryName] = useState(editStory.storyName);
  const [choosedCover, setChoosedCover] = useState('');
  const [isCover, setIsCover] = useState(null);
  const [editStoryStage, setEditStoryStage] = useState(0);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  let storiesID = [];
  useEffect(() => {
    //繞成 storyID array
    storiesID = editStory.stories.map((post) => {
      return post.postID;
    });
    setChoosedStory(storiesID);
  }, []);
  const [choosedStory, setChoosedStory] = useState(storiesID);

  //若沒有改choosedpost，沒有image link
  useEffect(() => {
    //check isCover 是不是在choosedStory 裡
    let currentPosts = [];
    posts.forEach((post) => {
      const postID = choosedStory.find((id) => id === post.postID);
      if (postID) {
        currentPosts.push(post);
      }
    });

    currentPosts.map((post) => {
      if (post.postImage.postImageLink === editStory.storyImageLink) {
        setChoosedCover(editStory.storyImageLink);
        setIsCover(editStory.storyImageLink);
      }
    });
  }, [choosedStory]);

  const story = {
    storyID: editStory.storyID,
    storyName: storyName,
    storyImageLink: choosedCover,
    storyIssuerID: user.uid,
    createTime: editStory.createTime,
    stories: choosedStory,
  };

  //選擇post
  const choosePostTitle = (
    <>
      <button
        className={styled.decideButton}
        onClick={() => {
          setIsEditStoryBlockClick(false);
        }}>
        Cancel
      </button>
      <div className={styled.makeStoryGuide}> Choose Story Posts</div>{' '}
      <button
        className={styled.decideButton}
        onClick={() => {
          setEditStoryStage(1);
        }}>
        Next
      </button>
    </>
  );

  const chooseStory = (postID) => {
    if (choosedStory.includes(postID)) {
      let newchoosedStory = choosedStory.filter((storyID) => storyID !== postID);
      setChoosedStory(newchoosedStory);
    } else {
      let newchoosedStory = choosedStory;
      newchoosedStory.push(postID);
      setChoosedStory(newchoosedStory);
    }
  };

  const choosePost = (
    <>
      <div className={styled.grid}>
        {posts.map((post) => (
          <EditImage
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
      <button
        className={styled.decideButton}
        onClick={() => {
          setEditStoryStage(0);
        }}>
        Back
      </button>
      <div className={styled.makeStoryGuide}> Choose Cover Photo</div>{' '}
      <button
        className={styled.decideButton}
        onClick={() => {
          setEditStoryStage(2);
        }}>
        Next
      </button>
    </>
  );

  const chooseCoverfunc = (post) => {
    if (post.postImage.postImageLink !== choosedCover) {
      setChoosedCover(post.postImage.postImageLink);
      setIsCover(post.postImage.postImageLink);
    }
  };

  const chooseCoverPhoto = (
    <div className={styled.grid}>
      {posts.map((post) => (
        <EditImage
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
          setEditStoryStage(1);
        }}>
        Back
      </button>
      <div className={styled.makeStoryGuide}> Name Your Story</div>{' '}
      <button
        className={styled.decideButton}
        onClick={(e) => {
          e.preventDefault();
          dispatch(edtiStory(story));
          setIsEditStoryBlockClick(false);
          setstoryName('');
          setChoosedCover('');
          setChoosedStory([]);
          setEditStoryStage(0);
          setIsEditSuccess(true);
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
          value={storyName}
          onChange={handleMsgChange}
          className={styled.storyNameInput}></input>
      </form>
    </>
  );

  let title = '';
  let view = '';
  if (editStoryStage === 0) {
    title = choosePostTitle;
    view = choosePost;
  } else if (editStoryStage === 1) {
    title = chooseCoverTitle;
    view = chooseCoverPhoto;
  } else if (editStoryStage === 2) {
    title = storyNameingTitle;
    view = storyNameing;
  }

  return (
    <>
      <MakeStoryModal
        show={isEditStoryBlockClick}
        handleClose={() => {
          setIsEditStoryBlockClick(false);
        }}>
        <div className={styles.modelWrap}>
          <div className={styled.topModel}>{title}</div>
          <div className={styled.buttonModal}>
            <div>{view}</div>
          </div>
        </div>
      </MakeStoryModal>
      <MsgPopup
        show={isEditSuccess}
        handleClose={() => {
          setIsEditSuccess(false);
        }}>
        <div className={msgPopStyles.msgPopWrap}>
          <h2>Update Successful!</h2>
          <div className={msgPopStyles.buttonWrap}>
            <button
              className={styled.decideButton}
              onClick={() => {
                setIsEditSuccess(false);
              }}>
              OK
            </button>
          </div>
        </div>
      </MsgPopup>
    </>
  );
}

EditStoryPopup.propTypes = {
  editStory: PropTypes.object.isRequired,
  setEditStory: PropTypes.func.isRequired,
  isEditStoryBlockClick: PropTypes.bool.isRequired,
  setIsEditStoryBlockClick: PropTypes.func.isRequired,
};

export default EditStoryPopup;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import check from '../img/check.png';
import { deletePost } from '../redux/actions/postAction';
import styles from '../style/popup.module.css';
import styled from '../style/makestory.module.css';

function EditImage({ post, choosedStory, chooseStory, stage, chooseCoverfunc, isCover }) {
  const { postID, postImage, postTime } = post;
  const [isImgChoose, setIsImgChoose] = useState(false);
  useEffect(() => {
    choosedStory.map((postID) => {
      if (postID === post.postID) {
        setIsImgChoose(true);
      }
    });
  }, [choosedStory]);

  return (
    <>
      {stage === 0 && (
        <div
          className={styled.blockWrap}
          style={{ width: '100%' }}
          onClick={() => {
            setIsImgChoose(!isImgChoose);
            chooseStory(postID);
          }}>
          <div className={styled.imageTime}>{JSON.stringify(postTime)}</div>
          <div className={styled.pickPicCircle}>
            {isImgChoose ? choosedStory.indexOf(postID) + 1 : ''}
          </div>
          <img src={postImage.postImageLink} className={styled.block} />
        </div>
      )}

      {stage === 1 && (
        <div
          className={styled.blockWrap}
          style={{ width: '100%' }}
          onClick={() => {
            if (choosedStory.includes(post.postID)) {
              chooseCoverfunc(post);
            }
          }}>
          <div className={styled.imageTime}>{JSON.stringify(postTime)}</div>
          <div className={styled.pickPicCircle}>
            {isCover === post.postImage.postImageLink ? (
              <div className={styled.pickCoverCircle}>
                <img className={styled.check} src={check} />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={styled.pickPicCircle}>
            {isImgChoose ? choosedStory.indexOf(postID) + 1 : ''}
          </div>
          <img src={postImage.postImageLink} className={styled.block} />
        </div>
      )}
      {/* {stage === 1 && (
        <div
          className={styled.blockWrap}
          style={{ width: '100%' }}
          onClick={() => {
            if (choosedStory.includes(post.postID)) {
              chooseCoverfunc(post);
            }
          }}>
          <div className={styled.imageTime}>{JSON.stringify(postTime)}</div>
          <div>
            {isCover === post.postImage.postImageLink ? (
              <div className={styled.pickCoverCircle}>
                <img src={check} />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className={styled.pickPicCircle}>
            {isImgChoose ? choosedStory.indexOf(postID) + 1 : ''}
          </div>
          <img src={postImage.postImageLink} className={styled.block} />
        </div>
      )} */}
    </>
  );
}

EditImage.propTypes = {
  post: PropTypes.object.isRequired,
  choosedStory: PropTypes.array.isRequired,
  stage: PropTypes.number.isRequired,
  chooseStory: PropTypes.func,
  chooseCoverfunc: PropTypes.func,
  isCover: PropTypes.string,
};

export default EditImage;

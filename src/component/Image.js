import React from 'react';
import PropTypes from 'prop-types';
import styled from '../style/makestory.module.css';
import check from '../img/check.png';

function Image({ post, choosedStory, chooseStory, stage, chooseCoverfunc, isCover }) {
  const { postID, postImage, postTime } = post;
  const isImgChoose = choosedStory.includes(postID);
  return (
    <>
      {stage === 0 && (
        <div
          className={styled.blockWrap}
          onClick={() => {
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
    </>
  );
}

Image.propTypes = {
  post: PropTypes.object.isRequired,
  choosedStory: PropTypes.array.isRequired,
  stage: PropTypes.number.isRequired,
  chooseStory: PropTypes.func,
  chooseCoverfunc: PropTypes.func,
  isCover: PropTypes.string,
};

export default Image;

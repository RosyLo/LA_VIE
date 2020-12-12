import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import { deletePost } from '../redux/actions';
import styles from '../style/popup.module.css';
import styled from '../style/makestory.module.css';
import { StyleModal } from './PopupModal';

function Image({ post, choosedStory, setChoosedStory }) {
  const { postID, postImage } = post;

  // const [isImgChoose, setisImgChoose] = useState(false);
  // const isImgChoose = choosedStory.includs(postID) ? true : false;
  let chooseState = choosedStory;
  const toggleImgChoose = () => {};

  return (
    <div
      className={styled.blockWrap}
      style={{ width: '100%' }}
      onClick={() => setisImgChoose(true)}>
      <div className={styled.pickPicCircle}>{isImgChoose ? 'HIHI' : ''}</div>
      <img src={postImage.postImageLink} className={styled.block} />
    </div>
  );
}

Image.propTypes = {
  post: PropTypes.object.isRequired,
  choosedStory: PropTypes.array.isRequired,
  setChoosedStory: PropTypes.func.isRequired,
};

export default Image;

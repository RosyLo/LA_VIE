import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../action/all.acton';
import { decrement } from '../action/all.acton';
import styles from '../style/heart.css';
import firebase from 'firebase/app';
import 'firebase/firestore';

const Heart = (props) => {
  console.log(props.postLikeIssuerId);
  let newPostLikeIssuerId;
  const [postLikeIssuerId, setPostLikeIssuerId] = useState(props.postLikeIssuerId);
  let dispatch = useDispatch();
  // const heartCountState = useSelector((state) => state.heartIncDec);
  const [ifLike, setIfLike] = useState(props.ifLike);
  console.log(postLikeIssuerId);
  function deletePostLike(props) {
    console.log(props.postID);
    //get deleted state
    const postLikeIssuerIdData = postLikeIssuerId.filter((id) => id !== props.currentUser.uid);
    setPostLikeIssuerId(postLikeIssuerIdData);
    console.log(postLikeIssuerIdData);
    //overwrite firebase post like array
    var db = firebase.firestore();
    var ref = db.collection('Post').doc(popostID);
    ref.update({ postLikeIssuerId: postLikeIssuerIdData });
    console.log('deleteheart');
  }

  function addPostLike(props) {
    //get deleted state
    console.log(postLikeIssuerId);
    const postLikeIssuerIdData = postLikeIssuerId;
    postLikeIssuerIdData.push(props.currentUser);
    setPostLikeIssuerId(postLikeIssuerIdData);
    //overwrite firebase post like array
    var db = firebase.firestore();
    var ref = db.collection('Post').doc(props.postID);
    ref.update({ postLikeIssuerId: postLikeIssuerIdData });
    console.log('addedheart');
  }

  const [heartCount, setHeartCount] = useState(props.postLikeIssuerId.length);
  function incrementHeart() {
    let newHeartCount = heartCount + 1;
    setHeartCount(newHeartCount);
  }

  function decrementHeart() {
    let newHeartCount = heartCount - 1;
    setHeartCount(newHeartCount);
  }
  return (
    <div className='postInteraction'>
      {props.ifLike ? (
        <div
          className='postLike isLike'
          onClick={() => {
            console.log(ifLike);
            incrementHeart();
            setIfLike(!ifLike);
            decrementHeart();
          }}>
          like
        </div>
      ) : (
        <div
          className='postLike '
          onClick={() => {
            console.log(ifLike);
            // dispatch(increment());
            setIfLike(!ifLike);
            addPostLike();
            deletePostLike();
          }}>
          not
        </div>
      )}
    </div>
  );
};

Heart.propTypes = {
  postIssuerID: PropTypes.array.isRequired,
  postLikeUserIdCount: PropTypes.number.isRequired,
  ifLike: PropTypes.bool.isRequired,
  postID: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
  postLikeIssuerId: PropTypes.array.isRequired,
};

export default Heart;

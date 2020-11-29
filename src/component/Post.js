import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from '../style/post.css';
import Heart from './Heart';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useSelector } from 'react-redux';
import Commenting from './Commenting';
import Comment from './Commnet';

function Post(props) {
  let isEitable = false;
  let ifLike = false;
  console.log(props);

  if (props.currentUser) {
    //check if Post issuer?
    if (props.postIssuer.postIssuerID === props.currentUser.uid) {
      isEitable = true;
      console.log('iseditablt');
    }
    if (props.postLikeIssuerId) {
      if (props.postLikeIssuerId.find((id) => id === props.currentUser.uid)) {
        ifLike = true;
        console.log('like');
      }
    }
  }

  //comment
  const [comments, setComments] = useState([]);
  const commentsList = comments.map((list) => {
    return (
      <Comment
        key={list.id}
        id={list.id}
        commentIssuerMessage={list.newComment}
        postID={props.postID}
        commentIssuerID={props.currentUser.uid}
        commentIssuerImage={props.currentUser.photoURL}
        commentIssuerName={props.currentUser.displayName}
      />
    );
  });

  function addComment(newComment) {
    const newCommnet = { id: 'id', newComment: newComment };
    setComments([...comments, newCommnet]);
  }

  const heartCountState = useSelector((state) => state.heartIncDec);

  return (
    <div key={props.postID} className='post'>
      <div className='postHeader'>
        <div className='postPro.fileImage'>
          <img src={props.postIssuer.postIssuerImage}></img>
        </div>
        <div className='postProfileName'>{props.postIssuer.postIssuerName}</div>
        <div>{isEitable ? '...' : ''}</div>
      </div>
      <img className='photo' src={props.postImage.postImageLink}></img>
      <div>
        <Heart
          postID={props.postID}
          currentUser={props.currentUser}
          ifLike={ifLike}
          postLikeIssuerId={props.postLikeIssuerId}
        />
        <div className='postLikeCount'>{props.postLikeIssuerId.length}</div>
      </div>
      <div className='PostComments'>
        查看留言...
        <div className='separater'></div>
      </div>
      {commentsList}
      <Commenting addComment={addComment} />
    </div>
  );
}

Post.propTypes = {
  currentUser: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  postImage: PropTypes.shape({
    postImageLink: PropTypes.string.isRequired,
  }),
  postIssuer: PropTypes.shape({
    postIssuerID: PropTypes.string.isRequired,
    postIssuerName: PropTypes.string.isRequired,
    postIssuerImage: PropTypes.string.isRequired,
  }),
  postLikeIssuerId: PropTypes.array.isRequired,
};

export default Post;

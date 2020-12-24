import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Heart from './Heart';
import { MsgPopup } from './MsgPopup';
import { editComment, deleteComment } from '../redux/actions';
import styles from '../style/comment.module.css';
import styled from '../style/popup.module.css';
import msgPopStyles from '../style/msgPopWrap.module.css';
import cross from '../img/cross.png';
import firebase from '../firebase';

function Comment({ comment, setPostComments, postComments }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { commentIssuer, commentIssuerMessage } = comment;
  //isedit, commentcontent(init: commentmsg)
  //(div) comment onclick >>isedit true >>從 div 改為 input >>input onchange 改 commentcontent state, onkeydown 觸發 fun 若是 13，(0)改isedit 為false，回div(1)dispatch  edit comment, (2)用commentid 改db,改state >>
  const [isCommentDeleteClick, setisCommentDeleteClick] = useState(false);
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [commentContent, setCommentContent] = useState(commentIssuerMessage);

  //edit
  const keyDownEvent = (e) => {
    if (e.key === 'Enter') {
      setIsCommentEdit(false);
      setCommentContent(commentContent);
      comment.commentIssuerMessage = commentContent;
      dispatch(editComment(comment, commentContent));
    }
  };
  useEffect(() => {
    setCommentContent(comment.commentIssuerMessage);
  }, [commentIssuerMessage]);
  return (
    <>
      <div className={styles.comment}>
        <img className={styles.commentImage} src={commentIssuer.commentIssuerImage}></img>
        <p>
          <span className={styles.postIssuerName}>{commentIssuer.commentIssuerName}</span>

          {user.uid === commentIssuer.commentIssuerID && isCommentEdit ? (
            <input
              className={styles.commentMsg}
              value={commentContent}
              onChange={(e) => {
                setCommentContent(e.target.value);
              }}
              onKeyDown={(e) => {
                keyDownEvent(e);
              }}
            />
          ) : (
            <span
              className={styles.commentMsg}
              onClick={() => {
                setIsCommentEdit(true);
              }}>
              {commentContent}
            </span>
          )}
        </p>
        <div className={styles.commentLike}>
          <Heart id={comment.commentID} likes={comment.likeIssuerID} isfrom='comment' />
          {user.uid === commentIssuer.commentIssuerID && (
            <img
              className={styles.deleteComment}
              src={cross}
              onClick={() => {
                setisCommentDeleteClick(true);
              }}
            />
          )}
        </div>
      </div>
      <MsgPopup
        show={isCommentDeleteClick}
        handleClose={() => {
          setisCommentDeleteClick(false);
        }}>
        <div className={msgPopStyles.msgPopWrap}>
          <h2>Sure to Delete ?!</h2>
          <div className={msgPopStyles.buttonWrap}>
            <button
              className={styled.decideButton}
              onClick={() => {
                setisCommentDeleteClick(false);
              }}>
              Cancel
            </button>
            <button
              className={styled.decideButton}
              onClick={() => {
                setisCommentDeleteClick(false);
                dispatch(deleteComment(comment, setPostComments, postComments));
              }}>
              Delete
            </button>
          </div>
        </div>
      </MsgPopup>
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  setPostComments: PropTypes.func.isRequired,
  postComments: PropTypes.array.isRequired,
};

export default Comment;

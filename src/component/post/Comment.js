import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Heart from '../post/Heart';
import { MsgPopup } from '../common/MsgPopup';
import CancelButton from '../common/CancelButton';
import { editComment, deleteComment } from '../../redux/actions/commentAction';
import styles from '../../style/comment.module.css';
import styled from '../../style/popup.module.scss';
import msgPopStyles from '../../style/msgPopWrap.module.css';

function Comment({ comment, setPostComments, postComments }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { commentIssuer, commentIssuerMessage } = comment;
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
        <img className={styles.commentImage} src={commentIssuer.commentIssuerImage} />
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
        <div className={styles.commentActions}>
          <div className={styles.commentLike}>
            <Heart id={comment.commentID} likes={comment.likeIssuerID} isfrom='comment' />
          </div>
          {user.uid === commentIssuer.commentIssuerID ? (
            <CancelButton onClick={() => setisCommentDeleteClick(true)} />
          ) : (
            <div className={styles.cancelWrapNone}></div>
          )}
        </div>
      </div>
      <MsgPopup
        show={isCommentDeleteClick}
        handleClose={() => {
          setisCommentDeleteClick(false);
        }}>
        <div className={msgPopStyles.msgPopWrap}>
          <h2>Sure to Delete ?</h2>
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

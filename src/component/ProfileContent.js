import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileShow from './ProfileShow';
import styles from '../style/profilecontent.module.css';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import { fetchMasterPosts, receiveTags } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { MsgPopup } from './MsgPopup';
import styled from '../style/popup.module.css';
import msgPopStyles from '../style/msgPopWrap.module.css';
import UploadPostButton from './UploadPostButton';

function ProfileContent({ paramsID }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [clickEdit, setclickEdit] = useState('');
  const comments = useSelector((state) => state.comments);
  const searchtags = useSelector((state) => state.searchtags);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const stakeGridRef = React.useRef(null);

  //loading
  const loading = useSelector((state) => state.loading);
  console.log(loading);

  useEffect(() => {
    dispatch(fetchMasterPosts(paramsID));
    dispatch(receiveTags());
  }, [dispatch, paramsID]);

  useEffect(() => {
    if (stakeGridRef.current) {
      stakeGridRef.current.updateLayout();
    }
  }, [comments]);

  let filterTags = [];
  let filterPosts = [];
  searchtags.map((searchtag) => {
    filterTags.push(searchtag.value);
  });

  posts.map((post) => {
    filterTags.map((tag) => {
      if (post.postTag.value === tag) {
        filterPosts.push(post);
      }
    });
  });
  if (filterTags.length > 0) {
    //將tag 放進 filterTags array裡
  } else {
    filterPosts = posts;
  }

  return (
    <>
      {loading === false ? (
        <div className={styles.wrap}>
          <div className={styles.postWrap}>
            {posts.length > 0 ? (
              <StackGrid
                gridRef={(e) => (stakeGridRef.current = e)}
                columnWidth={300}
                gutterWidth={30}
                gutterHeight={30}
                monitorImagesLoaded={true}>
                {filterPosts.map((post) => (
                  <Post
                    key={post.postID}
                    post={post}
                    clickEdit={clickEdit}
                    setclickEdit={setclickEdit}
                    setIsDeletePopup={setIsDeletePopup}
                  />
                ))}
              </StackGrid>
            ) : (
              <div className={styles.noPostUpload}>
                <div className={styles.noPostGuide}>No Posts Yet, Upload My First Post:</div>{' '}
                <UploadPostButton />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.loading}></div>
      )}

      {/* DeletePopup */}
      <MsgPopup
        show={isDeletePopup}
        handleClose={() => {
          setIsDeletePopup(false);
        }}>
        <div className={msgPopStyles.msgPopWrap}>
          <h2>Delete Successful!</h2>
          <div className={msgPopStyles.buttonWrap}>
            <button
              className={styled.decideButton}
              onClick={() => {
                setIsDeletePopup(false);
              }}>
              OK
            </button>
          </div>
        </div>
      </MsgPopup>
    </>
  );
}

ProfileContent.propTypes = {
  paramsID: PropTypes.string,
};

export default ProfileContent;

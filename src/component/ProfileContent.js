import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileShow from './ProfileShow';
import styles from '../style/profilecontent.module.css';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import { fetchMasterPosts } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { MsgPopup } from './MsgPopup';
import styled from '../style/popup.module.css';
import msgPopStyles from '../style/msgPopWrap.module.css';

function ProfileContent({ paramsID }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [clickEdit, setclickEdit] = useState('');
  const masterposts = useSelector((state) => state.masterposts);
  const searchtags = useSelector((state) => state.searchtags);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletePopup, setIsDeletePopup] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, [masterposts]);

  useEffect(() => {
    dispatch(fetchMasterPosts(paramsID));
  }, [dispatch]);

  let filterTags = [];
  let filterPosts = [];
  searchtags.map((searchtag) => {
    filterTags.push(searchtag.value);
  });

  masterposts.map((post) => {
    filterTags.map((tag) => {
      if (post.postTag === tag) {
        filterPosts.push(post);
      }
    });
  });
  if (filterTags.length > 0) {
    console.log('filterTags');
    //將tag 放進 filterTags array裡
  } else {
    filterPosts = masterposts;
  }

  return (
    <>
      {isLoading === false ? (
        <div className={styles.postWrap}>
          <StackGrid
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

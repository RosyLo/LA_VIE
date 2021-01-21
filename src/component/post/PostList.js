import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import Loading from '../common/Loading';
import { MsgPopup } from '../common/MsgPopup';
import { fetchPosts } from '../../redux/actions/postAction';
import { receiveTags } from '../../redux/actions/searchAction';
import styles from '../../style/post.module.css';
import styled from '../../style/popup.module.css';
import msgPopStyles from '../../style/msgPopWrap.module.css';

function PostList() {
  const posts = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);
  const searchtags = useSelector((state) => state.searchtags);
  const [clickEdit, setclickEdit] = useState('');
  const [lastSnap, setLastSnap] = useState('');
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [isScrollFetching, setIsScrollFetching] = useState(false);
  const stakeGridRef = React.useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(lastVisible.current, lastSnap, setLastSnap));
    dispatch(receiveTags());
  }, [dispatch]);

  //loading
  const loading = useSelector((state) => state.loading);
  const lastVisible = React.useRef(0);
  const handleScroll = () => {
    setIsScrollFetching(!isScrollFetching);
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (winScroll >= height - 40) {
      let newLast = lastVisible.current + 10;
      dispatch(fetchPosts(lastVisible.current, lastSnap, setLastSnap));
      lastVisible.current = newLast;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(document.body.scrollTop);
  }, []);
  // infinit scroll
  useEffect(() => {
    window.onscroll = () => {
      handleScroll();
    };
  }, [lastSnap]);

  useEffect(() => {
    if (stakeGridRef.current) {
      stakeGridRef.current.updateLayout();
    }
  }, [comments, posts]);
  // useEffect(() => {
  //   if (stakeGridRef.current) {
  //     stakeGridRef.current.updateLayout();
  //   }
  // }, [posts]);

  //search tags
  let filterTags = [];
  let filterPosts = [];
  searchtags.map((searchtag) => {
    filterTags.push(searchtag.value);
  });

  posts.forEach((post) => {
    filterTags.forEach((tag) => {
      if (post.postTag.value === tag) {
        filterPosts.push(post);
      }
    });
  });
  if (filterTags.length > 0) {
  } else {
    filterPosts = posts;
  }

  return (
    <>
      {loading === false ? (
        <>
          <div className={styles.wrap}>
            <div className={styles.postWrap}>
              {filterPosts.length > 0 ? (
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
                      isDeletePopup={isDeletePopup}
                      setIsDeletePopup={setIsDeletePopup}
                    />
                  ))}
                </StackGrid>
              ) : (
                <div className={styles.noPostWrap}>
                  <div className={styles.noPostGuide}>
                    No post match the search, please adjust the filter.
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.loading}>
          <Loading />
        </div>
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

export default PostList;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import Loading from './Loading';
import MainShow from './MainShow';
import styles from '../style/post.module.css';
import { fetchPosts, receiveTags } from '../redux/actions';
import { MsgPopup } from './MsgPopup';
import { WelcomePopup } from './WelcomePopup';
import styled from '../style/popup.module.css';
import msgPopStyles from '../style/msgPopWrap.module.css';
import { contextType } from 'react-modal';
import Logo from './Logo';
import headerstyle from '../style/header.module.css';
import google from '../img/google.png';
import facebook from '../img/facebookt.png';
import { ReactComponent as FaceBook } from '../img/facebook.svg';
import travel from '../img/travel.jpg';

function PostList() {
  const [clickEdit, setclickEdit] = useState('');
  const posts = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);
  const searchtags = useSelector((state) => state.searchtags);
  const [lastSnap, setLastSnap] = useState('');
  // const [lastVisible, setLastVisible] = useState(0);
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
  console.log(loading);
  const lastVisible = React.useRef(0);
  const handleScroll = () => {
    setIsScrollFetching(!isScrollFetching);
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (winScroll > height - 20) {
      console.log('reach the bottom!', lastVisible);
      let newLast = lastVisible.current + 10;
      dispatch(fetchPosts(lastVisible.current, lastSnap, setLastSnap));
      lastVisible.current = newLast;
      // setLastVisible(newLast);
    }
  };
  // infinit scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastSnap]);

  useEffect(() => {
    if (stakeGridRef.current) {
      stakeGridRef.current.updateLayout();
    }
  }, [comments]);

  //tags

  let filterTags = [];
  let filterPosts = [];
  searchtags.map((searchtag) => {
    filterTags.push(searchtag.value);
  });

  posts.forEach((post) => {
    filterTags.forEach((tag) => {
      if (post.postTag.value === tag) {
        console.log(post);
        filterPosts.push(post);
      }
    });
  });
  if (filterTags.length > 0) {
    //將tag 放進 filterTags array裡
  } else {
    filterPosts = posts;
  }

  // const [pleaseLogin, setPleaseLogin] = useState(false);
  // const user = useSelector((state) => state.user);
  // const checkLogin = () => {
  //   if (!user) {
  //     setPleaseLogin(!pleaseLogin);
  //   }
  // };

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

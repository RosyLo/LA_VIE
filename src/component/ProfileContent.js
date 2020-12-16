import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileShow from './ProfileShow';
import styles from '../style/profilecontent.module.css';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import { fetchMasterPosts } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

function ProfileContent({ paramsID }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [clickEdit, setclickEdit] = useState('');
  const masterposts = useSelector((state) => state.masterposts);
  const searchtags = useSelector((state) => state.searchtags);

  useEffect(() => {
    if (posts.length > 0) {
      dispatch(fetchMasterPosts(paramsID));
    }
  }, [posts]);

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
  // let filterPosts = [];
  // if (clickedTabs === 'All') {
  //   filterPosts = posts;
  // } else {
  //   filterPosts = posts.filter(
  //     (post) => paramsID === post.postIssuer.postIssuerID && post.postTag === clickedTabs,
  //   );
  // }

  return (
    <>
      {/* <div className={styles.tabs}>
        <div
          className={styles.tab}
          style={{ borderLeft: '1px solid black' }}
          onClick={() => {
            setClickedTabs('All');
          }}>
          All
        </div>
        <div
          className={styles.tab}
          onClick={() => {
            setClickedTabs('OUTFIT');
          }}>
          OUTFIT
        </div>
        <div
          className={styles.tab}
          onClick={() => {
            setClickedTabs('FOODIE');
          }}>
          FOODIE
        </div>
        <div
          className={styles.tab}
          onClick={() => {
            setClickedTabs('MAKEUP');
          }}>
          MAKEUP
        </div>
        <div
          className={styles.tab}
          onClick={() => {
            setClickedTabs('TRAVEL');
          }}>
          TRAVEL
        </div>
      </div> */}
      <div className={styles.postWrap}>
        <StackGrid columnWidth={300} gutterWidth={30} gutterHeight={30} monitorImagesLoaded={true}>
          {filterPosts.map((post) => (
            <Post key={post.postID} post={post} clickEdit={clickEdit} setclickEdit={setclickEdit} />
          ))}
        </StackGrid>
      </div>
    </>
  );
}

ProfileContent.propTypes = {
  paramsID: PropTypes.string,
};

export default ProfileContent;

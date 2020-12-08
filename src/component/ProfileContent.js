import { React, useState } from 'react';
import PropTypes from 'prop-types';
import ProfileShow from './ProfileShow';
import styles from '../style/profilecontent.module.css';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';

function ProfileContent({ paramsID }) {
  const posts = useSelector((state) => state.posts);
  const [clickedTabs, setClickedTabs] = useState('All');
  let filterPosts = [];
  if (clickedTabs === 'All') {
    filterPosts = posts;
  } else {
    filterPosts = posts.filter(
      (post) => paramsID === post.postIssuer.postIssuerID && post.postTag === clickedTabs,
    );
  }

  return (
    <>
      <div className={styles.tabs}>
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
      </div>
      <div className={styles.postWrap}>
        <StackGrid columnWidth={300} gutterWidth={30} gutterHeight={20} monitorImagesLoaded={true}>
          {filterPosts.map((post) => (
            <Post key={post.postID} post={post} />
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

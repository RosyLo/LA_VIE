import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import MainShow from './MainShow';
import styles from '../style/post.module.css';

function PostList() {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <>
      <MainShow></MainShow>
      <div className={styles.postWrap}>
        <StackGrid columnWidth={300} gutterWidth={30} gutterHeight={20}>
          {posts.map((post) => (
            <Post key={post.postID} post={post} />
          ))}
        </StackGrid>
      </div>
    </>
  );
}

export default PostList;

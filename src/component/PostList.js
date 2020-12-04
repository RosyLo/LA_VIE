import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import styles from '../style/comment.css';

function PostList() {
  const posts = useSelector((state) => state.posts);
  return (
    <StackGrid columnWidth={250} gutterWidth={30} gutterHeight={20}>
      {posts.map((post) => (
        <Post key={post.postID} post={post} />
      ))}
    </StackGrid>
  );
}

export default PostList;

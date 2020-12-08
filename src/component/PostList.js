import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import MainShow from './MainShow';
import styles from '../style/post.module.css';

function PostList() {
  const posts = useSelector((state) => state.posts);
  const [clickEdit, setclickEdit] = useState('');

  return (
    <>
      {/* <MainShow></MainShow> */}
      <div
        className={styles.postWrap}
        onClick={() => {
          setclickEdit('');
        }}>
        <StackGrid columnWidth={300} gutterWidth={30} gutterHeight={20} monitorImagesLoaded={true}>
          {posts.map((post) => (
            <Post key={post.postID} post={post} clickEdit={clickEdit} setclickEdit={setclickEdit} />
          ))}
        </StackGrid>
      </div>
    </>
  );
}

export default PostList;

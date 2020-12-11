import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import MainShow from './MainShow';
import styles from '../style/post.module.css';

function PostList() {
  const [clickEdit, setclickEdit] = useState('');
  const posts = useSelector((state) => state.posts);
  const searchtags = useSelector((state) => state.searchtags);
  let filterTags = [];
  let filterPosts = [];
  searchtags.map((searchtag) => {
    filterTags.push(searchtag.value);
  });

  posts.map((post) => {
    filterTags.map((tag) => {
      if (post.postTag === tag) {
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
      <div
        className={styles.postWrap}
        onClick={() => {
          // setclickEdit('');
        }}>
        <StackGrid columnWidth={300} gutterWidth={30} gutterHeight={20} monitorImagesLoaded={true}>
          {filterPosts.map((post) => (
            <Post key={post.postID} post={post} clickEdit={clickEdit} setclickEdit={setclickEdit} />
          ))}
        </StackGrid>
      </div>
    </>
  );
}

export default PostList;

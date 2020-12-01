import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import Header from './Header';
import { fetchPosts } from '../redux/actions';
import Post from './Post';
import DeletePopup from './DeletePopup';
function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [deletePost, setDeletePost] = useState('');
  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      {deletePost ? <DeletePopup deletePostID={deletePost} setDeletePost={setDeletePost} /> : ''}
      <Header />
      <div className='postWrap'>
        <StackGrid columnWidth={250} gutterWidth={30} gutterHeight={20}>
          {posts.map((post) => (
            <Post key={post.postID} post={post} setDeletePost={setDeletePost} />
          ))}
        </StackGrid>
      </div>
    </>
  );
}

export default App;

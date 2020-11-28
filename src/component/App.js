import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StackGrid from 'react-stack-grid';
import Header from './Header';
import { fetchPosts } from '../redux/actions';
import Post from './Post';

function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className='postWrap'>
        <StackGrid columnWidth={250} gutterWidth={30} gutterHeight={20}>
          {posts.map((post) => (
            <Post key={post.postID} post={post} />
          ))}
        </StackGrid>
      </div>
    </div>
  );
}

export default App;

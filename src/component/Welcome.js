import React from 'react';
import PropTypes from 'prop-types';
import WelcomeShow from './WelcomeShow';
import StackGrid from 'react-stack-grid';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';

function Welcome() {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <>
      <WelcomeShow />
      <StackGrid columnWidth={300} gutterWidth={30} gutterHeight={30} monitorImagesLoaded={true}>
        {posts.map((post) => (
          <Post key={post.postID} post={post} isfromWelcome={true} />
        ))}
      </StackGrid>
    </>
  );
}

export default Welcome;

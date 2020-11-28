import React, { useState, Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import StackGrid from 'react-stack-grid';
import Header from './Header';
import Post from './Post';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { firebasefblogin, signInWithFacebookFirestore } from './firebase';
import { auth } from './firebase';
import handleUploadPic from './handleUploadPic';
var db = firebase.firestore();

function App() {
  //user state
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // first load: get userstate, get post from firebase
  useEffect(() => {
    //1. get user state
    if (JSON.parse(localStorage.getItem('User'))) {
      setCurrentUser(JSON.parse(localStorage.getItem('User')));
    } else {
      console.log(currentUser);
    }

    //2. get post data
    var ref = db.collection('Post');
    ref.get().then((querySnapshot) => {
      let postArray = [];
      querySnapshot.forEach((post) => {
        console.log(post);
        const postData = {
          postID: post.id,
          postImage: post.data().postImage,
          postIssuer: post.data().postIssuer,
          postMessage: post.data().postMessage,
          postTag: post.data().postTag,
          postLikeIssuerId: post.data().postLikeIssuerId,
        };
        postArray.push(postData);
        console.log(postData);
      });
      console.log(postArray);
      setPosts(postArray);
    });
  }, []);

  //2.1 render post
  let postsComponent = [];
  postsComponent = posts.map((post) => {
    console.log(post);
    return (
      <Post
        key={post.postID}
        postID={post.postID}
        postImage={post.postImage}
        postIssuer={post.postIssuer}
        postMessage={post.postMessage}
        postTag={post.postTag}
        postLikeIssuerId={post.postLikeIssuerId}
        currentUser={currentUser}
      />
    );
  });

  // uploadPostPictue
  const [image, setImage] = useState(null);
  const handlePictureChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadPic = () =>
    handleUploadPic(image, (downloadURL) => {
      console.log(currentUser);
      //打包上傳資料。新增set一篇貼文到posts，render。建一篇新貼文到firestore,
      //1.打包
      const newData = {
        key: 'key_' + nanoid(),
        postImage: { postImageID: 'postImageID_' + nanoid(), postImageLink: downloadURL },
        postIssuer: {
          postIssuerID: currentUser.uid,
          postIssuerImage: currentUser.photoURL,
          postIssuerName: currentUser.displayName,
        },
        postMessage: 'rosy',
        postTag: 'rosy',
        postLikeIssuerId: [],
      };
      //2.建一篇貼文文件到 firebase
      var ref = db.collection('Post');
      ref
        .add(newData)
        .then((docRef) => {
          console.log(docRef);
          newData.postID = docRef.id;
          return docRef.id;
        })
        .then(() => {
          //3.set 貼文 進 posts
          const newDataArray = [...posts];
          newDataArray.unshift(newData);
          setPosts(newDataArray);
        });
    });

  return (
    <div>
      <Header
        handlePictureChange={handlePictureChange}
        uploadPic={uploadPic}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <div className='postWrap'>
        <StackGrid columnWidth={250} gutterWidth={30} gutterHeight={20}>
          {postsComponent}
        </StackGrid>
      </div>
    </div>
  );
}

export default App;

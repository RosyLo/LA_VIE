import React, { useState, Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import StackGrid from 'react-stack-grid';
import Header from './Hearder';
import Post from './component/Post';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyBVZWdJJwPkKS_EMsJ_DJEz8KueVp1yFio',
  authDomain: 'c-est-la-vie-data.firebaseapp.com',
  databaseURL: 'https://c-est-la-vie-data.firebaseio.com',
  projectId: 'c-est-la-vie-data',
  storageBucket: 'c-est-la-vie-data.appspot.com',
  messagingSenderId: '123383218156',
  appId: '1:123383218156:web:49824064c7747053a5cac9',
  measurementId: 'G-4FL2KGWYV7',
};
var app = firebase.initializeApp(firebaseConfig);

function App() {
  //firebase
  var db = firebase.firestore();
  var ref = db.collection('Post');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    ref.get().then((querySnapshot) => {
      let postArray = [];
      querySnapshot.forEach((post) => {
        const postData = {
          postID: post.id,
          postImage: post.data().postImage,
          postIssuer: post.data().postIssuer,
          postMessage: post.data().postMessage,
          postTag: post.data().postTag,
        };
        postArray.push(postData);
      });
      console.log(postArray);
      setPosts(postArray);
    });
  }, []);

  const postsComponent = posts.map((post) => {
    console.log(post);
    return (
      <Post
        key={post.postID}
        postID={post.postID}
        postImage={post.postImage}
        postIssuer={post.postIssuer}
        postMessage={post.postMessage}
        postTag={post.postTag}
      />
    );
  });

  // uploadPostPictue
  const [image, setImage] = useState(null);

  function handlePictureChange(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleUploadPic = () => {
    console.log('image:', image);
    var file = image;
    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg',
    };
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('Post/postImageLink' + file.name).put(file, metadata);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
        });
      },
    );

    //打包上傳資料。新增set一篇貼文到posts，render。建一篇新貼文到firestore,
    const newData = {
      key: 'key' + nanoid(),
      postID: 'postID' + nanoid(),
      postImage: downloadURL,
      postIssuer: 'rosy',
      postMessage: 'rosy',
      postTag: 'rosy',
    };
  };

  return (
    <div>
      <Header handlePictureChange={handlePictureChange} handleUploadPic={handleUploadPic} />
      <div className='postWrap'>
        <StackGrid columnWidth={250} gutterWidth={30} gutterHeight={20}>
          {postsComponent}
          <div key='post2' className='post'>
            <img className='photo' src='https://source.unsplash.com/epcsn8Ed8kY/600x799'></img>
          </div>
        </StackGrid>
      </div>
    </div>
  );
}

export default App;

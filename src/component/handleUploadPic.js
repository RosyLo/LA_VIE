import firebase from 'firebase/app';
import 'firebase/storage';

const handleUploadPic = (image, callback) => {
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
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        callback(downloadURL);
      });
    },
  );
};

export default handleUploadPic;

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBVZWdJJwPkKS_EMsJ_DJEz8KueVp1yFio',
  authDomain: 'c-est-la-vie-data.firebaseapp.com',
  databaseURL: 'https://c-est-la-vie-data.firebaseio.com',
  projectId: 'c-est-la-vie-data',
  storageBucket: 'c-est-la-vie-data.appspot.com',
  messagingSenderId: '123383218156',
  appId: '1:123383218156:web:49824064c7747053a5cac9',
  measurementId: 'G-4FL2KGWYV7',
};

//initialize firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;

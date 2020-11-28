import firebase from 'firebase/app';
import 'firebase/auth';
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
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.FacebookAuthProvider();

//signIn FB
export const signInWithFacebook = (setCurrentUser) => {
  auth.signInWithPopup(provider).then(async function (result) {
    console.log(result);
    if (result) {
      setCurrentUser(result.user);
      signInWithFacebookFirestore(result.user);
      localStorage.setItem('User', JSON.stringify(result.user));
      console.log(localStorage);
    }
  });
};

export const signInWithFacebookFirestore = (user) => {
  console.log(user);
  //如果從沒登入過，在firebase建立新doc
  console.log(user.uid);
  console.log(user);
  var db = firebase.firestore();
  var ref = db.collection('User').doc(user.uid);

  ref
    .set(
      {
        profileMessage: 'test',
        userName: user.displayName,
      },
      { merge: true },
    )
    .then(() => {
      console.log('set data ya!');
    });
};

import firebase from 'firebase';
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

// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

firebase.initializeApp(firebaseConfig);

export default firebase;

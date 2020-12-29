import { RECIEVED_USER } from '../actionTypes';
import { db, auth, facebookAuthProvider, googleAuthProvider } from '../../firebase';

export const login = (provider, setLoginPopup, setisPostClick) => (dispatch) => {
  let authProvider;
  if (provider === 'google') {
    authProvider = googleAuthProvider;
  } else if (provider === 'facebook') {
    authProvider = facebookAuthProvider;
  }
  auth.signInWithPopup(authProvider).then(async (result) => {
    setLoginPopup(false);
    if (setisPostClick) {
      setisPostClick(false);
    }
    if (result) {
      const { user } = result;
      let url = user.photoURL;
      url += '?width=700';
      db.collection('User')
        .doc(user.uid)
        .set(
          {
            profileMessage: 'LA VIE',
            userName: user.displayName,
            userProfileImage: url,
          },
          { merge: true },
        )
        .then(() => {
          window.location = '/main';
          localStorage.setItem('User', JSON.stringify(user));
          dispatch({ type: RECIEVED_USER, payload: { user } });
        });
    }
  });
};

export const logout = () => (dispatch) => {
  auth.signOut();
  localStorage.clear();
  dispatch({ type: RECIEVED_USER, payload: { user: null } });
  window.location = '/';
};

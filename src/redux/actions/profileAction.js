import { RECEIVED_PROFILE, RECIEVING_LOADING } from '../actionTypes';
import { db } from '../../firebase';

export const getProfile = (paramsID) => (dispatch) => {
  db.collection('User')
    .doc(paramsID)
    .get()
    .then((doc) => {
      const profile = doc.data();
      profile.uid = doc.id;
      dispatch({
        type: RECEIVED_PROFILE,
        payload: { profile },
      });
      dispatch({ type: RECIEVING_LOADING, payload: false });
    });
};

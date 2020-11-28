//FUNCITON 邏輯
//ini heart state from firebase

// const initHeartCount = {
//   initHeartCount:

// };
import firebase from 'firebase/app';
import 'firebase/firestore';
var db = firebase.firestore();
var ref = db.collection('Post');

const heartIncDecR = (state = 5, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      console.log('incre');

      return state + 1;
    }
    case 'DECREMENT': {
      if (state > 0) {
        console.log('decre');
        return state - 1;
      } else return state;
    }
    default:
      return state;
  }
};

export default heartIncDecR;

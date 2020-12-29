import { RECIEVED_TAGS } from '../actionTypes';
import { db } from '../../firebase';

export const receiveTags = () => (dispatch) => {
  const tags = [];
  db.collection('Tag')
    .get()
    .then((snap) => {
      snap.forEach((tag) => {
        const tagData = {
          postID: tag.data().postID,
          label: tag.data().label,
          value: tag.data().value,
        };
        tags.push(tagData);
      });
    })
    .then(() => {
      dispatch({
        type: RECIEVED_TAGS,
        payload: { tags },
      });
    });
};

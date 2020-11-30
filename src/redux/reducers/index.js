import posts from './posts';
import user from './user';
import comments from './comments';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  posts,
  comments,
});

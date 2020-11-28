import posts from './posts';
import user from './user';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  posts,
});

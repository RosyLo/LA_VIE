import posts from './posts';
import user from './user';
import comments from './comments';
import tags from './tags';
import searchtags from './searchtags';
import stories from './stories';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  posts,
  comments,
  tags,
  searchtags,
  stories,
});

import posts from './posts';
import user from './user';
import comments from './comments';
import tags from './tags';
import searchtags from './searchtags';
import stories from './stories';
import masterposts from './masterposts';
import postcomments from './postcomments';
import loading from './loading';
import welcomeposts from './welcomeposts';
import relationship from './relationship';
import friendship from './friendship';
import requestfriend from './requestfriend';
import friendrequest from './friendrequest';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  posts,
  comments,
  tags,
  searchtags,
  stories,
  masterposts,
  postcomments,
  loading,
  welcomeposts,
  // relationship,
  // friendship,
  // requestfriend,
  // friendrequest,
});

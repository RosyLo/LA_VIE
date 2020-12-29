import postsReducer from '../reducers/posts';
import { ADD_POST, EDIT_POST, DELETE_POST, RECIEVED_POSTS, TOGGLE_LIKE_POST } from '../actionTypes';

describe('Posts Reducer', () => {
  it('Should return initial state', () => {
    const newState = postsReducer(undefined, {});
    expect(newState).toEqual([]);
  });
  it('Should handle receive posts', () => {
    const posts = [
      {
        postID: 'id1',
        postImage: { postImageID: 'postImageID_1', postImageLink: 'link1' },
        postIssuer: 'postIssuer1',
        postMessage: 'postMessage1',
        postTag: 'postTag1',
        postLikes: '[]',
        postTime: '',
      },
      {
        postID: 'id2',
        postImage: { postImageID: 'postImageID_2', postImageLink: 'link2' },
        postIssuer: 'postIssuer2',
        postMessage: 'postMessage2',
        postTag: 'postTag2',
        postLikes: '[]',
        postTime: '',
      },
    ];
    const newState = postsReducer(undefined, {
      type: RECIEVED_POSTS,
      payload: { postsList: posts },
    });
    expect(newState).toEqual(posts);
  });
  it('Should handle add posts', () => {
    const post = {
      postID: '',
      postImage: { postImageID: 'postImageID', postImageLink: 'link' },
      postIssuer: {
        postIssuerID: 'user_uid',
        postIssuerImage: 'user_photoURL',
        postIssuerName: 'user_displayName',
      },
      postMessage: 'newMsg',
      postTag: {
        postID: '',
        label: 'newTag_label',
        value: 'newTag_value',
      },
      postLikes: [],
      postTime: 'postTime',
    };
    //init + 1st post
    const firstAddedPost = postsReducer([], {
      type: ADD_POST,
      payload: post,
    });
    expect(firstAddedPost).toEqual(post);
    // 1st post + 2nd post
    const addedSecondPost = postsReducer(firstAddedPost, {
      type: ADD_POST,
      payload: post,
    });
    let afterSecondPostAdded = firstAddedPost;
    afterSecondPostAdded.push(post);
    expect(addedSecondPost).toEqual(afterSecondPostAdded);
  });

  it('Should handle delete posts', () => {
    const beforeDeletePosts = [
      {
        postID: 'post1',
        postImage: { postImageID: 'postImageID', postImageLink: 'link' },
        postIssuer: {
          postIssuerID: 'user_uid',
          postIssuerImage: 'user_photoURL',
          postIssuerName: 'user_displayName',
        },
        postMessage: 'newMsg',
        postTag: {
          postID: '',
          label: 'newTag_label',
          value: 'newTag_value',
        },
        postLikes: [],
        postTime: 'postTime',
      },
      {
        postID: 'post2',
        postImage: { postImageID: 'postImageID', postImageLink: 'link' },
        postIssuer: {
          postIssuerID: 'user_uid',
          postIssuerImage: 'user_photoURL',
          postIssuerName: 'user_displayName',
        },
        postMessage: 'newMsg',
        postTag: {
          postID: '',
          label: 'newTag_label',
          value: 'newTag_value',
        },
        postLikes: [],
        postTime: 'postTime',
      },
      {
        postID: 'post3',
        postImage: { postImageID: 'postImageID', postImageLink: 'link' },
        postIssuer: {
          postIssuerID: 'user_uid',
          postIssuerImage: 'user_photoURL',
          postIssuerName: 'user_displayName',
        },
        postMessage: 'newMsg',
        postTag: {
          postID: '',
          label: 'newTag_label',
          value: 'newTag_value',
        },
        postLikes: [],
        postTime: 'postTime',
      },
    ];
    const addedSecondPost = postsReducer(firstAddedPost, {
      type: DELETE_POST,
      payload: post,
    });
    expect(addedSecondPost).toEqual();
  });
});

// import reducer from '../../structuring-reducers/todos';
// import * as types from '../../constants/ActionTypes';

// describe('todos reducer', () => {
//   it('should return the initial state', () => {
//     expect(reducer(undefined, {})).toEqual([
//       {
//         text: 'Use Redux',
//         completed: false,
//         id: 0,
//       },
//     ]);
//   });

//   it('should handle ADD_TODO', () => {
//     expect(
//       reducer([], {
//         type: types.ADD_TODO,
//         text: 'Run the tests',
//       }),
//     ).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0,
//       },
//     ]);

//     expect(
//       reducer(
//         [
//           {
//             text: 'Use Redux',
//             completed: false,
//             id: 0,
//           },
//         ],
//         {
//           type: types.ADD_TODO,
//           text: 'Run the tests',
//         },
//       ),
//     ).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 1,
//       },
//       {
//         text: 'Use Redux',
//         completed: false,
//         id: 0,
//       },
//     ]);
//   });
// });

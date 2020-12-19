// import { RECIEVED_MASTERPOSTS } from '../actionTypes';

// const masterposts = (state = [], action) => {
//   switch (action.type) {
//     case RECIEVED_MASTERPOSTS: {
//       return action.payload.masterPosts;
//     }
//     default:
//       return state;
//   }
// };

// export default masterposts;

//profile 頁面，因為infinit 沒辦法用原本取posts 的方式取用，add post, delete post 又都掛在posts 上，
//要即時看到，只能用posts>>每次切換頁面，呼叫fetch posts，染出該頁的內容

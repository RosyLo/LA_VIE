export function increment() {
  return {
    type: 'INCREMENT',
  };
}
export function decrement(postID, currentUser) {
  return {
    type: 'DECREMENT',
  };
}

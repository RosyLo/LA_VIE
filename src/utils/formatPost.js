export default function formatPost(post) {
  console.log(post);
  if (post && typeof post.postTime !== 'string') {
    const date = post.postTime.toDate();
    const shortTime = date.toDateString();
    post.postTime = shortTime;
  }
}

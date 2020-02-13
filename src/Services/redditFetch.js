import fetchData from "./useFetch";
import LocalStorage from "./LocalStorage";
import defaultSubreddits from "../assets/defaultSubreddits";

const fetchSubPosts = async subName => {
  const sub = await fetchData(`https://www.reddit.com/r/${subName}/.json?`);
  return sub.data.children
    .filter(post => {
      try {
        return post.data.post_hint === "image";
      } catch (e) {
        return false;
      }
    })
    .map(post => {
      return {
        url: post.data.url,
        pipe: `r/${post.data.subreddit}`
      };
    });
};

const loadSubredditPosts = async () => {
  const subsLS = await LocalStorage.get("reddit");
  console.log(subsLS)
  const subs = (subsLS !==null?  subsLS: defaultSubreddits)
  console.log(subs)
  const redditPosts = await Promise.all(
    subs.map(async sub => {
      return await fetchSubPosts(sub);
    })
  );
  const flatPosts = [].concat(...redditPosts);
  return flatPosts;
};
export {fetchSubPosts}
export default loadSubredditPosts;

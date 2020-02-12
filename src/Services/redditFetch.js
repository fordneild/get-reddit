import fetchData from "./useFetch";

const fetchSubPosts = async subName => {
    const sub = await fetchData(`https://www.reddit.com/r/${subName}/.json?`);
    return sub.data.children
      .map(child => child.data)
      .filter(post => {
        return post && post.url && post.post_hint === "image";
      });
  };

const loadSubredditPosts = async subs => {
    console.log(subs)
    const redditPosts = await Promise.all(
      subs.map(async sub => {
        return await fetchSubPosts(sub);
      })
    );
    const flatPosts = [].concat(...redditPosts).map(post => {
      return {
        url: post.url,
        pipe: `r/${post.subreddit}`
      };
    });
    return flatPosts
  };

export default loadSubredditPosts

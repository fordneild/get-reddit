import fetchData from './useFetch'
import defaultInstagram from "../assets/defaultInstagram"

const fetchInstagramAccountPosts = async (account, num) => {
    const page = await fetchData(`https://www.instagram.com/${account}/?__a=1`);
    try {
      let posts = page.graphql.user.edge_owner_to_timeline_media.edges
        .filter(post => post.node.__typename === "GraphImage")
        .map(post => {
          return {
            title: null,
            url: post.node.display_url,
            pipe: `@${account}`
          };
        });
      return posts;
    } catch (e) {
      return []
    }
  };

const fetchInstagramHashTagPosts = async term => {
    const page = await fetchData(
      `https://www.instagram.com/explore/tags/${term}/?__a=1`
    );
    try {
      return page.graphql.hashtag.edge_hashtag_to_media.edges
        .filter(post => post.node.__typename === "GraphImage")
        .map(post => {
          return {
            title: null,
            url: post.node.display_url,
            pipe: `#${term}`
          };
        });
    } catch (e) {
      return []
    }
  };

const loadInstagramPosts = async () => {
    const {terms, accounts} = defaultInstagram
    const instas = await Promise.all(
      [...terms.map(async term => {
        return await fetchInstagramHashTagPosts(term);
      }),...accounts.map(async account => {
        return await fetchInstagramAccountPosts(account);
      })]
    );
    let cleanedInstas = [].concat(...instas)
    return cleanedInstas
  };

  export {fetchInstagramAccountPosts, fetchInstagramHashTagPosts}
  export default loadInstagramPosts
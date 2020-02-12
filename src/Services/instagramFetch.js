import fetchData from './useFetch'
const fetchInstagramAccountPosts = async (account, num) => {
    const page = await fetchData(`https://www.instagram.com/${account}/?__a=1`);
    try {
      let posts = page.graphql.user.edge_owner_to_timeline_media.edges
        .filter(post => post.node.__typename === "GraphImage")
        .map(post => {
          post.node.pipe = `@${account}`;
          return post.node;
        });
      console.log("account", posts);
      return posts;
    } catch (e) {
      console.log(e);
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
          post.node.pipe = `#${term}`;
          return post.node;
        });
    } catch (e) {
      console.log(e);
    }
  };

const loadInstagramMemes = async (terms, accounts) => {
    const instas = await Promise.all(
      [...terms.map(async term => {
        return await fetchInstagramHashTagPosts(term);
      }),...accounts.map(async account => {
        return await fetchInstagramAccountPosts(account);
      })]
    );
    let cleanedInstas = [].concat(...instas).map(post => {
      return {
        title: null,
        url: post.display_url,
        pipe: post.pipe
      };
    });
    return cleanedInstas
  };

  export default loadInstagramMemes
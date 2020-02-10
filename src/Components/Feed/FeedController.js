import React, { useState, useEffect } from "react";
import Feed from "./index";
import fetchData from "../../Services/useFetch";

const FeedController = () => {
  //keep track of all posts we want to show to the user
  const [posts, setPosts] = useState([]);


  //on load, set posts
  useEffect(() => {
    const defaultSubs = [
      "memes",
      "funny",
      "AdviceAnimals",
      "MemeEconomy",
      "ComedyCemetery",
      "dankmemes",
      "ProgrammerHumor",
      "ImGoingToHellForThis"
    ];
    const defaultInstgramSearches = ["memes", "dankmemes"];
    const addPosts = newPosts => {
      setPosts(prevPosts => {
        const posts = [...prevPosts, ...newPosts]
        shuffleArray(posts)
        return posts
      });
    };
    const loadSubredditPosts = async subs => {
      const redditPosts = await Promise.all(
        subs.map(async sub => {
          return await fetchSubPosts(sub);
        })
      );
      const flatPosts = [].concat(...redditPosts).map(post => {
        return {
          // title: post.title,
          url: post.url,
          pipe: `r/${post.subreddit}`
        };
      });
      addPosts(flatPosts);
    };

    const loadInstagramMemes = async terms => {
      const instas = await Promise.all(
        terms.map(async term => {
          return await fetchInstagramPosts(term);
        })
      );
      let cleanedInstas = [].concat(...instas).map(post => {
        return {
          title: null,
          url: post.display_url,
          pipe: post.pipe
        };
      });
      addPosts(cleanedInstas);
    };

    loadInstagramMemes(defaultInstgramSearches);
    loadSubredditPosts(defaultSubs)
  }, []);

  const shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const fetchInstagramPosts = async term => {
    const page = await fetchData(
      `https://www.instagram.com/explore/tags/${term}/?__a=1`
    );
    try {
      return page.graphql.hashtag.edge_hashtag_to_media.edges.filter(
          post => post.node.__typename==="GraphImage"
      )
      .map(
        post => {
          post.node.pipe=`#${term}`;
          return post.node }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSubPosts = async subName => {
    const sub = await fetchData(`https://www.reddit.com/r/${subName}/.json?`);
    return sub.data.children
      .map(child => child.data)
      .filter(post => {
        return post && post.url && post.post_hint === "image";
      });
  };

  const getPosts = n => {
    const toReturn = posts.slice(0, n);
    setPosts(prevPosts => {
      prevPosts.splice(0, n);
      return prevPosts;
    });
    return toReturn;
  };

  return <Feed getPosts={getPosts} />;
};

export default FeedController;

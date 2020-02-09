import React, { useState, useEffect } from "react";
import Feed from "./index";
import fetchData from "../../Services/useFetch";

const FeedController = () => {
  //keep track of all posts we want to show to the user
  const [posts, setPosts] = useState([]);

  const addPosts = newPosts => {
    setPosts(prevPosts => [...prevPosts, ...newPosts]);
  };

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
    const defaultInstgramSearches = ["boobs"];
    const loadSubredditPosts = async subs => {
      const redditPosts = await Promise.all(
        subs.map(async sub => {
          return await fetchSubPosts(sub);
        })
      );
      const flatPosts = [].concat(...redditPosts);
      shuffleArray(flatPosts);
      addPosts(flatPosts);
    };
    const loadInstagramMemes = async terms => {
      const instas = await Promise.all(
        terms.map(async term => {
          return await fetchInstagramPosts(term);
        })
      );
      console.log(instas)
      let cleanedInstas = [].concat(...instas).map(post => {
        return {
          title: null,
          url: post
        };
      });
      shuffleArray(cleanedInstas);
      console.log(cleanedInstas)
      addPosts(cleanedInstas);
    };

    //loadInstagramMemes(defaultInstgramSearches);
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
        post => post.node.display_url
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

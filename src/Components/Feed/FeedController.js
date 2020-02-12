import React, { useState, useEffect } from "react";
import Feed from "./index";
import redditFetch from "../../Services/redditFetch"
import instagramFetch from "../../Services/instagramFetch"
import defaultInstagram from "../../assets/defaultInstagram"
import defaultSubreddits from "../../assets/defaultSubreddits"


const FeedController = () => {
  //keep track of all posts we want to show to the user eventually
  const [posts, setPosts] = useState([]);

  //on mount, load urls of images
  useEffect(() => {
    const addPosts = newPosts => {
      setPosts(prevPosts => {
        const posts = [...prevPosts, ...newPosts];
        shuffleArray(posts);
        return posts;
      });
    };

    const loadReddit = async (subreddits) => {
      const redditPosts = await redditFetch(subreddits)
      addPosts(redditPosts)
    }

    const loadInstagram = async ({terms, accounts}) => {
      const instaPosts = await instagramFetch(terms,accounts)
      addPosts(instaPosts)
    }

    loadInstagram(defaultInstagram)
    loadReddit(defaultSubreddits)
  }, []);

  const shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
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

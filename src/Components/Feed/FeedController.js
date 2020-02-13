import React, { useState, useEffect } from "react";
import FeedView from "./FeedView.js";
import redditFetch from "../../Services/redditFetch";
import instagramFetch from "../../Services/instagramFetch";
import Nav from '../Nav/index'

const FeedController = () => {
  //keep track of all posts we want to show to the user eventually
  const [posts, setPosts] = useState([]);

  //on mount, load urls of images
  useEffect(() => {
    //loads all websites
    const loadPosts = async () => {
      //load each website async so they do not block each other
      const loadReddit = async () => {
        const redditPosts = await redditFetch();
        addPosts(redditPosts);
      };
      const loadInstagram = async () => {
        const instagramPosts = await instagramFetch();
        addPosts(instagramPosts);
      };

      loadInstagram();
      loadReddit();
    };
    loadPosts();
  }, []);

  const addPosts = newPosts => {
    setPosts(prevPosts => {
      const posts = [...prevPosts, ...newPosts];
      //shuffle the posts when we load them
      //TODO: sort by prefrence
      for (let i = posts.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = posts[i];
        posts[i] = posts[j];
        posts[j] = temp;
      }
      return posts;
    });
  };

  const removePostByPipe = (pipe) => {
    setPosts(prevPosts => {
      console.log(pipe)
      return prevPosts.filter(post => {
        console.log("pipe",pipe)
        console.log("post.pipe",post.pipe)
        return post.pipe !== pipe
      })
    })
  }

  const getPosts = n => {
    const toReturn = posts.slice(0, n);
    setPosts(prevPosts => {
      prevPosts.splice(0, n);
      return prevPosts;
    });
    return toReturn;
  };

  return (
    <>
      <FeedView getPosts={getPosts} />;
      <Nav removePostByPipe={removePostByPipe} addPosts={addPosts}/>
    </>
  );
};

export default FeedController;

import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import "./Feed.scss";
import Post from "../Post/index";

const Feed = ({ getPosts = () => {} }) => {
  const INTIAL_POSTS_NUM = 10;
  const REFRESH_POSTS_NUM = 15;
  //maintain posts the user sees in the UI
  const [posts, setPosts] = useState([]);

  //INTIAL POST LOADING
  useEffect(() => {
    const loadInitialPosts = async () => {
      const newPosts = await getPosts(INTIAL_POSTS_NUM);
      setPosts(newPosts);
    };
    loadInitialPosts(10);
  }, [getPosts]);

  const loadPosts = async n => {
    const newPosts = await getPosts(n);
    setPosts([...posts, ...newPosts]);
  };

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 400
    ) {
      //load posts when we get near the bottom
      loadPosts(REFRESH_POSTS_NUM);
    }
  }, 100);

  //EVENT LISTENERS
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);


  const renderPosts = () => {
    if (posts) {
      return posts
        .map((post, index) => {
            return <Post key={index} pipe={post.subreddit || post.pipe} title={post.title} src={post.url} />;
        });
    }
  };

  return <div className="posts">{renderPosts()}</div>;
};

export default Feed;

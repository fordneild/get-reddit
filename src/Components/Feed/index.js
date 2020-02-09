import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import "./Feed.scss";
import RedditPost from '../RedditPost/index'

const Feed = ({ getPosts = () => {} }) => {
  const [posts, setPosts] = useState([]);
  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      loadPosts(10);
    }
  }, 100);

  //EVENT LISTENERS
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  //INTIAL POST LOADING
  useEffect(() => {
    const loadInitialPosts = async () => {
      const newPosts = await getPosts(10);
      setPosts(newPosts);
    };

    loadInitialPosts(10);
  }, [getPosts]);


  const loadPosts = async (n) => {
    const newPosts = await getPosts(n);
    setPosts([...posts, ...newPosts]);
  };

  const renderPosts = () => {
    if (posts) {
      return posts
        .filter((post, index) => {
          return (
            post &&
            post.url &&
            post.post_hint === "image"
          );
        })
        .map((post, index) => {
          return (
            <RedditPost key={index} title={post.title} src={post.url}/>
          );
        });
    }
  };

  return <div className="posts">{renderPosts()}</div>;
};

export default Feed;

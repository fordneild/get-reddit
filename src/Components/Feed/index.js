import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import "./Feed.scss";

const Feed = ({ getPosts = () => {} }) => {
  const [posts, setPosts] = useState([]);

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      console.log("here");
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
    console.log("loading posts");
    const newPosts = await getPosts(n);
    console.log('newPosts',newPosts)
    console.log('oldPosts',posts)
    setPosts([...posts, ...newPosts]);
  };

  const renderPosts = () => {
    if (posts) {
      return posts
        .filter((post, index) => {
          return (
            post &&
            post.data &&
            post.data.url &&
            post.data.post_hint === "image"
          );
        })
        .map((post, index) => {
          console.log(post);
          return (
            <div key={index} className="post">
              <img
                src={post.data.url}
                onError={e => {
                  e.target.onerror = null;
                  e.target.parentNode.removeChild(e.target);
                }}
              />
            </div>
          );
        });
    }
  };

  return <div className="posts">{renderPosts()}</div>;
};

export default Feed;

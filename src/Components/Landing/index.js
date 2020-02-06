import React, { useEffect, useState } from "react";
import fetchData from "../../Services/useFetch";
import "./Landing.scss";

const Landing = () => {
  const [posts, setPosts] = useState(false);

  const fetchSub = async subName => {
    const sub = await fetchData(`https://www.reddit.com/r/${subName}/.json`);
    setPosts(sub.data.children);
  };

  useEffect(() => {
    fetchSub("ProgrammingHumor");
  }, []);

  const handleError = e => {
    console.log(e);
  };

  const renderPosts = () => {
    if (posts) {
      return posts
        .filter((post, index) => {
          return post && post.data && post.data.url;
        })
        .map((post, index) => {
          console.log(post);
          return (
            <div key={index} className="post">
              <img src={post.data.url} onError={(e)=>{e.target.onerror = null; console.log(e.target); e.target.style.display = 'none';}}/>
            </div>
          );
        });
    }
  };

  return <div className="posts">{renderPosts()}</div>;
};

export default Landing;

import React, { useEffect, useState } from "react";
import fetchData from "../../Services/useFetch";
import './Feed.scss'
const Feed = ({sub = "memes"}) => {
    const [posts, setPosts] = useState(false);

    const fetchSub = async subName => {
      const sub = await fetchData(`https://www.reddit.com/r/${subName}/.json?`);
      setPosts(sub.data.children);
    };
  
    useEffect(() => {
      fetchSub(sub);
    }, [sub]);
  
    const handleError = e => {
      console.log(e);
    };
  
    const renderPosts = () => {
      if (posts) {
        return posts
          .filter((post, index) => {
            return post && post.data && post.data.url && post.data.post_hint==="image"
          })
          .map((post, index) => {
            console.log(post);
            return (
              <div key={index} className="post">
                <img src={post.data.url} onError={(e)=>{e.target.onerror = null; console.log(e.target); e.target.parentNode.removeChild(e.target); e.target.style.display = 'none';e.target.style.margin = '0px'}}/>
              </div>
            );
          });
      }
    };
  
    return <div className="posts">{renderPosts()}</div>;
}

export default Feed

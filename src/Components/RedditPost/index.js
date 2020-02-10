import React from 'react'

import './RedditPost.scss'

const RedditPost = ({pipe="memes",src, title}) => {
    return(
        <div className="post">
            {title && <h1>{title}</h1>}
            {pipe && <h2>{pipe}</h2>}
              <img
                src={src}
                alt={title}
                onError={e => {
                  e.target.onerror = null;
                  e.target.parentNode.removeChild(e.target);
                }}
              />
        </div>
    )
}

export default RedditPost
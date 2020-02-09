import React from 'react'

import './RedditPost.scss'

const RedditPost = ({src, title="no title"}) => {
    return(
        <div className="post">
            <h1>{title}</h1>
              <img
                src={src}
                onError={e => {
                  e.target.onerror = null;
                  e.target.parentNode.removeChild(e.target);
                }}
              />
        </div>
    )
}

export default RedditPost
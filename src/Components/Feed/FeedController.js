import React, {useState, useEffect} from 'react'
import Feed from './index'
import fetchData from "../../Services/useFetch";


const FeedController = () => {
    const [posts, setPosts] = useState([])
    //on load, set posts
    useEffect(() => {
        const defaultSubs = ['memes','funny','facepalm','AdviceAnimals','MemeEconomy','ComedyCemetery','dankmemes']
        const loadPosts = async (subs) => {
            const posts = await Promise.all(subs.map(async (sub, index) => {
                return await fetchSubPosts(sub)
            }))
            const flatPosts = [].concat(...posts)
            setPosts(flatPosts)
            
        }
        loadPosts(defaultSubs)
    },[])

    const fetchSubPosts = async subName => {
        const sub = await fetchData(`https://www.reddit.com/r/${subName}/.json?`);
        return sub.data.children
    };

    
    const getPosts = (n) => {
        const toReturn = posts.slice(0,n)
        console.log('toReturn',toReturn)
        setPosts(prevPosts => {
            prevPosts.splice(0,n)
            return prevPosts
        })
        return toReturn
    }

    return(
        <Feed getPosts={getPosts}/>

    )
}

export default FeedController
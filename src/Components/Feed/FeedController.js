import React, {useState, useEffect} from 'react'
import Feed from './index'
import fetchData from "../../Services/useFetch";


const FeedController = () => {
    const [posts, setPosts] = useState([])
    //on load, set posts

    useEffect(() => {
        const defaultSubs = ['memes','funny','AdviceAnimals','MemeEconomy','ComedyCemetery','dankmemes','BlackPeopleTwitter']
        const loadPosts = async (subs) => {
            const posts = await Promise.all(subs.map(async (sub, index) => {
                return await fetchSubPosts(sub)
            }))
            const flatPosts = [].concat(...posts)
            shuffleArray(flatPosts)
            setPosts(flatPosts)
        }
        loadPosts(defaultSubs)
        
    },[])

    const shuffleArray = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    const fetchSubPosts = async subName => {
        const sub = await fetchData(`https://www.reddit.com/r/${subName}/.json?`);
        return sub.data.children.map(child => child.data)
    };
    
    const getPosts = (n) => {
        const toReturn = posts.slice(0,n)
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
import LocalStorage from './LocalStorage'
import defaultReddit from '../assets/defaultSubreddits'
import defaultInstagram from '../assets/defaultInstagram'

const fetchPipes = async = () => {
    const {terms, accounts} = defaultInstagram;
    const isCustom = await LocalStorage.get('isCustom')
    //quick check to see if they have ever set anything before
    if(!isCustom){
        return {
            reddit: defaultReddit,
            instaTags: terms,
            instaAccounts: accounts
        }
    }else{
        //return thier pipes
        const reddit = await LocalStorage.get('reddit')
        const instaTags = await LocalStorage.get('instagramHashtags')
        const instaAccounts = await LocalStorage.get('instaAccounts')
        return {
            reddit: reddit || defaultReddit,
            instaTags: instaTags || terms,
            instaAccounts: instaAccounts || accounts        
        }
    }
}

export default fetchPipes
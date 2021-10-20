import PostContext from './Post';
import {useState} from 'react';

export default function ProviderContext(props) {
    const [posts, setPosts] = useState([]);

    const savePosts = (newPosts) => {
        setPosts(newPosts);
    }

    return (
        <PostContext.Provider value={{posts, savePosts}}>
            {props.children}
        </PostContext.Provider>
    )
}
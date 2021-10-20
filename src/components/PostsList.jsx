import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostContext from "../context/Post";
import PostWrap from "./PostWrap";

export default function PostsList(){
  const { posts, savePosts } = useContext(PostContext),
        [loading, setLoading] = useState(false);

  useEffect(()=> {
    const responseData = async () => {
      setLoading(true);
      await fetch('http://localhost:7777/posts')
        .then((resp) => resp.json())
        .then((data) => {
          savePosts(data);
        })
        .catch((e) => {
          console.error(`Ошибка загрузки: ${e}`)
        })
        .finally(() => {setLoading(false)})
    }

    responseData();
  },[])

  return (
    <div className="posts-list">
      <div className="posts-list__header">
        <Link to="/posts/new">
          <button className="btn">Создать пост</button>
        </Link>    
      </div>
      <div className="posts-list__main">
          {loading && <div>Загрузка...</div>}
          {posts ? posts.map((item) => <PostWrap key={item.id} {...item}/>) : null}
      </div>
    </div>
  )
}
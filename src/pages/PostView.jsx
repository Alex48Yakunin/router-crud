import { useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import PostContext from "../context/Post";
import Post from "../components/Post";
import PostsList from "../components/PostsList";
import PostEdit from "./PostEdit";


export default function PostView(props){
  const history = useHistory(),
        params = useParams(),
        [editPost, setEditPost] = useState(false),
        { posts } = useContext(PostContext),
        currentPost = posts.find((post) => post.id === Number(params.postId));


  const correctPost = () => {
    setEditPost(true);
  };

  const deletePost = async () => {  
    await fetch(`http://localhost:7777/posts/${currentPost.id}`, {
      method: "DELETE"
    })
      .catch((e) => {
        console.error(`Ошибка загрузки: ${e}`)
      })
      .finally(() => {
        history.push("/");
      })
  };

  if (currentPost) {
    if (!editPost) {
      return (
        <>
          <Post {...currentPost} />
          <div className="post__interaction">
            <button className="btn" onClick={correctPost}>Изменить</button>
            <button className="btn" onClick={deletePost}>Удалить</button>
          </div>
        </>
      );
    } else {
      return <PostEdit {...currentPost} />;
    }
  } else {
    return <PostsList />;
  }
}
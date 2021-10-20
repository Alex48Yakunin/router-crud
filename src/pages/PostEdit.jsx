import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PostContext from "../context/Post";
import PostView from "./PostView";


export default function PostEdit({content, id}){
  const [textContent, setTextContent] = useState(content),
        [ loading, setLoading ] = useState(false),
        [linkPostView, setlinkPostView] = useState(false),
        history = useHistory(),
        {savePosts} = useContext(PostContext);

  const updatePostContext = async () => {
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

  const savePost = async () => {
    setLoading(true);
    await fetch('http://localhost:7777/posts', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, content: textContent }),
    })
      .then((resp) => updatePostContext())
      .catch((e) => {
        console.error(`Ошибка загрузки: ${e}`)
      })
      .finally(() => {
        setLoading(false)
        setlinkPostView(true);
        history.goBack();
      })
  }

  const changeValue = (e) => {
    setTextContent(e.target.value);
  };

  const cancel = () => {
    history.goBack();
  };

  if(!linkPostView) {
    return (
        <div className="post post_edit">
          {loading && <div>Загрузка...</div>}
          <header className="post__header">
              <span>Редактировать публикацию</span>
              <span className="cancel" onClick={cancel}>Х</span>
          </header>
          <main className="post__content">
            <div id="postEdit" className="post__content">
              <textarea defaultValue={textContent} onChange={changeValue}></textarea>
            </div>
          </main>
          <footer className="post__footer">
            <button  onClick={savePost}>Сохранить</button>
          </footer>
        </div>
      )
  } else {
    return <PostView />;
  }
}

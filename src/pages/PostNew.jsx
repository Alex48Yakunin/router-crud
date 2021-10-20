import { useState } from "react";

export default function PostNew(props) {
  const { history } = props,
        [textValue, setTextValue] = useState();

  const changeValue = (evt) => {
    const { currentValue } = evt.target;
    setTextValue(currentValue);
  };


  const savePost = async () => {
    await fetch('http://localhost:7777/posts', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 0, content: textValue }),
    })
      .catch((e) => {
        console.error(`Ошибка загрузки: ${e}`)
      })
      .finally(() => {
        history.push("/");
      })
  }

  const cancel = () => {
    history.push("/");
  };

  return (
    <div className="post post_edit">
    <header className="post__header">
      <span>Новая публикация</span>
      <span className="cancel" onClick={cancel}>Х</span>
    </header>
    <main className="post__content">
      <div className="post__content">
        <textarea  
          placeholder="Введите текст..." 
          defaultValue={textValue} 
          onChange={changeValue}>
        </textarea>
      </div>
    </main>
    <footer className="post__footer">
        <button  onClick={savePost}>Опубликовать</button>
    </footer>
  </div>
  )

}
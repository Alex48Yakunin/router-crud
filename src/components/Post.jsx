import moment from "moment";

export default function Post({content, created}){
  const getDate = (date) => {
    return (date) ? moment(date).locale("ru").fromNow() : null;
  }

  return (
    <div className="post">
      <header className="post__header">
        <div className="user">
          <div className="user__ava"></div>
          <div className="user__desc">
              <div className="user__name">
                Иван Иванов
              </div>
              <div className="user__recod">
                Главный по делам
                <span className="post__date">{getDate(content && created)}</span>
              </div>
            </div>
          </div>
      </header>
      <main className="post__content">
        <div className="post__content">
          {content}
        </div>
      </main>
      <footer className="post__footer">
        <span className="post__liked">Нравится</span>
        <span className="post__comment">Комментировать</span>
      </footer>
    </div>
  )
}
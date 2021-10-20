import { useHistory } from "react-router-dom";
import Post from "./Post";

export default function PostWrap(props){
  const history = useHistory();
  const showPost = () => {
    history.push(`/posts/${props.id}`);
  }

  return (
    <div className="post-wrap" onClick={showPost}>
      <Post {...props} />
  </div>
  )
}
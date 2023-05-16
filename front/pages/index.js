import { useSelector } from "react-redux";
import { userState } from "../reducers/user";
import { postState } from "../reducers/post";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { me } = useSelector(userState);
  const { mainPosts } = useSelector(postState);
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post, idx) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

/* 
  map을 통해 컴포넌트를 랜더링할 때는 key를 적어줘야하는데 
  index로 사용하면 안된다. (안티패턴)
  특히 데이터의 업데이트(추가, 삭제, 수정, 데이터의 순서가 변경)가 
  되는 경우에는 index를 사용하면 원치않게 배열 요소가 지워질 수있다. 
  이때는 index보다는 데이터 요소의 id를 사용한다. 
  단, 데이터가 정적(변경되지 않음)일 경우에는 사용 가능 

*/

export default Home;

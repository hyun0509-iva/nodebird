import { useDispatch, useSelector } from "react-redux";
import { userState, LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { LOAD_POSTS_REQUEST, postState } from "../reducers/post";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect } from "react";

const Home = () => {
  const { me } = useSelector(userState);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(postState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  // 스크롤 이벤트
  useEffect(() => {
    const onScroll = () => {
      // 스크롤 위치
      // 하단에서 300px 만큼 올려서 하단에서 요청하지 않고
      // 300px 위에서 요청하도록 해서 부드럽게 인피니티 스크롤링되게
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          //전체 게시글을 다 불러오지 않았다면, 게시글 불러오기.
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post, idx) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;

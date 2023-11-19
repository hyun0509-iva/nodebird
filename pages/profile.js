import Head from "next/head";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    // 로그인 안하면 프로필 페이지 접근할 때 메인 페이지로 이동 
    if (!(me && me.id)) {
      alert('로그인이 필요합니다.')
      Router.push("/");
    }
  }, [me && me.id]);

  if (!me) {
    // 로그인 안하면 프로필 접근시 랜더링 x
    return null;
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>프로필 | Papel</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" followerList={me.followerList} />
        <FollowList header="팔로워 목록" followingList={me.followingList} />
      </AppLayout>
    </>
  );
};

export default Profile;

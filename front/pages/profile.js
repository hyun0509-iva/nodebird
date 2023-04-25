import Head from "next/dist/next-server/lib/head";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NicknameEditForm from "../components/NicknameEditForm";

const Profile = () => {
  const followerList = [
    { ninckname: "이동우" },
    { ninckname: "이찬우" },
    { ninckname: "이성우" },
  ];
  const followingList = [
    { ninckname: "이동우" },
    { ninckname: "이찬우" },
    { ninckname: "이성우" },
  ];

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>프로필 | Papel</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" followerList={followerList}/>
        <FollowList header="팔로워 목록" followingList={followingList}/>
      </AppLayout>
    </>
  );
};

export default Profile;

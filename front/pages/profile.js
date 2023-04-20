import Head from "next/dist/next-server/lib/head";
import AppLayout from "../components/AppLayout";

const Profile = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>프로필 | Papel</title>
      </Head>
      <AppLayout>Profile</AppLayout>
    </>
  );
};

export default Profile;

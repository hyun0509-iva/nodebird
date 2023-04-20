import Head from "next/dist/next-server/lib/head";
import AppLayout from "../components/AppLayout";

const Signup = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | Papel</title>
      </Head>
      <AppLayout>Signup</AppLayout>
    </>
  );
};

export default Signup;

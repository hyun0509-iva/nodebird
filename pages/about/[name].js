import { useRouter } from "next/router";

const AboutMe = () => {
  const router = useRouter();
  const { name } = router.query;

  return <div>My name is {name}</div>;
};

export default AboutMe;

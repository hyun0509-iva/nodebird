import Head from "next/dist/next-server/lib/head";
import AppLayout from "../components/AppLayout";
import { Button, Checkbox, Form, Input } from "antd";
import { useInput } from "../hooks/useInput";
import styled from "styled-components";
import { useCallback, useState } from "react";

const Signup = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, OnChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [isMatchPasswordError, setIsMatchPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setIsMatchPasswordError(e.target.value !== password);
  }, []);

  const [isTermError, setIsTermError] = useState(false);
  const [term, setTerm] = useState("");
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setIsTermError(false);
  }, []);

  const onSubmitForm = useCallback(() => {
    if (password !== passwordCheck) {
      return setIsMatchPasswordError(true);
    }

    if (!term) {
      return setIsTermError(true);
    }
    console.log(email, nickname, password);
  }, [password, passwordCheck, term]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | Papel</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmitForm}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input
              type="email"
              name="user-email"
              value={email}
              required
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input
              name="user-nickname"
              value={nickname}
              required
              onChange={OnChangeNickname}
            />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호 일치</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {isMatchPasswordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              papel 이용약관에 동의합니다.
            </Checkbox>
            {isTermError && (
              <ErrorMessage>이용약관에 동의하셔야합니다.</ErrorMessage>
            )}
          </div>
          <div>
            <Button type="primary" htmlType="submit">
              가입하기
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

const ErrorMessage = styled.div`
  color: red;
`;

export default Signup;

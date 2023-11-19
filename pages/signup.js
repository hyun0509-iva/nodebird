import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import AppLayout from "../components/AppLayout";
import { Button, Checkbox, Form, Input } from "antd";
import { useInput } from "../hooks/useInput";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST, userState } from "../reducers/user";

const Signup = () => {
  const dispatch = useDispatch();
  const { me, signUpLoading, signUpDone, signUpError } = useSelector(userState);
  const [email, onChangeEmail] = useInput("");
  const [nickname, OnChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [isMatchPasswordError, setIsMatchPasswordError] = useState(false);

  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setIsMatchPassword(e.target.value === password);
      setIsMatchPasswordError(e.target.value !== password);
    },
    [password]
  );

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
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
    setIsMatchPassword(false);
    setIsMatchPasswordError(false);
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
            {isMatchPassword && (
              <SucessMessage>비밀번호가 일치합니다.</SucessMessage>
            )}
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
          {signUpDone && <SucessMessage>가입되었습니다.</SucessMessage>}
          <div>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
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

const SucessMessage = styled.div`
  color: #12b886;
`;

export default Signup;

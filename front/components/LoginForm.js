import React, { useCallback } from "react";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useInput } from "../hooks/useInput";
import {useSelector, useDispatch } from "react-redux";
import {LOG_IN_REQUEST, userState } from "../reducers/user";
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
 padding: 10px;
`;

const LoginForm = () => {
  const {isLoggingIn} = useSelector(userState)
  const dispatch = useDispatch();
  const [id, onChangeId] = useInput("");
  const [password, onChangePassWord] = useInput("");

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    dispatch({
      type: LOG_IN_REQUEST,
      data: { id, password },
    });
  }, [id, password]);
  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <Input
          type="password"
          name="user-password"
          value={password}
          onChange={onChangePassWord}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>
          로그인
        </Button>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;

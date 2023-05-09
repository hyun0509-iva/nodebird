import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Avatar, Button } from "antd";
import { logOutRequestAction, userState } from "../reducers/user";

const UserProfile = () => {
  const {me, isLoggingOut} = useSelector(userState)
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logOutRequestAction())
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          게시글
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br /> 0
        </div>,
        <div key="followings">
          팔로워
          <br /> 0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title="profile" />
      <Button onClick={onLogout} loading={isLoggingOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;

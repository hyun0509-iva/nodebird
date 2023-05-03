import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Card, Avatar, Button } from "antd";
import { logOutAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logOutAction())
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
      <Card.Meta avatar={<Avatar>PF</Avatar>} title="profile" />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;

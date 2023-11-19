import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Avatar, Button } from "antd";
import { logOutRequestAction, userState } from "../reducers/user";

const UserProfile = () => {
  const { me, logOutLoading } = useSelector(userState);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logOutRequestAction());
  }, []);
  console.log({me: me.nickname})
  return (
    <Card
      actions={[
        <div key="twit">
          게시글
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br /> {me?.Followings?.length}
        </div>,
        <div key="followings">
          팔로워 
          <br /> {me?.Followers?.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname}</Avatar>} title={me.nickname} />
      <Button onClick={onLogout} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UNFOLLOW_REQUEST, userState } from "../reducers/user";
import { FOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
  const { me, followLoading, unFollowLoading } = useSelector(userState);
  const dispatch = useDispatch();
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onFollow = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id
      });
    }
  }, [isFollowing]);

  if (post.User.id === me.id) {
    return null;
  }
  
  return (
    <Button loading={followLoading || unFollowLoading} onClick={onFollow}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propsTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comment: PropTypes.arrayOf(PropTypes.object),
    Image: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default FollowButton;

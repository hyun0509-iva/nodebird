import React, { useCallback, useState } from "react";
import { Avatar, Button, Card, Comment, List, Popover } from "antd";
import {
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { userState } from "../reducers/user";
import { PropTypes } from "prop-types";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import { REMOVE_POST_REQUEST, postState } from "../reducers/post";
import { useDispatch } from "react-redux";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector(userState).me?.id;
  const removePostLoading = useSelector(postState).removePostLoading;
  
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  
  const onToggleCommentFormOpened = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  
  const onRemovePost = useCallback(() => {
    dispatch({type: REMOVE_POST_REQUEST, data: post.id})
  }, [])

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleCommentFormOpened} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {/* 현재 로그인한 유저가 게시글 유저랑 같다면 수정, 삭제 할 수 있게 */}
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comment: PropTypes.arrayOf(PropTypes.object),
    Image: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;

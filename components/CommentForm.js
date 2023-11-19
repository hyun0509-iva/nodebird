import { Button, Form, Input } from "antd";
import React, { useCallback, useEffect } from "react";
import { useInput } from "../hooks/useInput";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../reducers/user";
import { ADD_COMMENT_REQUEST, addComment, postState } from "../reducers/post";

const CommentForm = ({ post }) => {
  const [commentText, onChangeCommentText, setCommentText] = useInput("");
  const dispatch = useDispatch();
  const id = useSelector(userState).me?.id;
  const { addCommentDone, addCommentLoading } = useSelector(postState);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    console.log(post.id, id, commentText);
    dispatch(addComment({ content: commentText, postId: post.id, userId: id }));
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          row={4}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          짹짹
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propsTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;

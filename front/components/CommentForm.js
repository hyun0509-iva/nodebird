import { Button, Form, Input } from "antd";
import React, { useCallback } from "react";
import { useInput } from "../hooks/useInput";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { userState } from "../reducers/user";

const CommentForm = ({ post }) => {
  const [commentText, onChangeCommentText] = useInput("");
  const id = useSelector(userState).me?.id;

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{position: 'relative', margin: 0}}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          row={4}
        />
        <Button type="primary" htmlType="submit">
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propsTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;

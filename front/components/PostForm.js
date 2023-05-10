import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, postState } from "../reducers/post";
import { Button, Form, Input } from "antd";
import { useInput } from "../hooks/useInput";

const PostForm = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { imagePaths, addPostDone } = useSelector(postState);
  const [text, onChangeText, setText] = useInput("");

  useEffect(() => {
    if(addPostDone) {
      setText('')
    }
  }, [addPostDone])

  const onClickImageUpload = useCallback(() => {
    inputRef.current.click();
  }, [inputRef.current]);

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
    setText("");
  }, [text]);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/formd-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="당신의 이야기를 들려주세요!"
      />
      <div>
        <input type="file" ref={inputRef} multiple hidden />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          쌕쌕
        </Button>
        <div>
          {imagePaths.map((v) => {
            return (
              <div key={v} style={{ display: "inline-block" }}>
                <img
                  src={"http://localhost:3065/" + v}
                  style={{ width: "200px" }}
                  alt={v}
                />
                <div>
                  <Button>제거</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      PostForm
    </Form>
  );
};
// map을 통해  랜더링하는 컴포넌트들은 따로 분리해서 관리하는게 좋다.
export default PostForm;

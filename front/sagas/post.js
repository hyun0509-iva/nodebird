import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
} from "../reducers/post";

function addPostAPI(data) {
  // 비동기 처리 함수는 일반함수로 정의
  return axios.post('/api/post', data);
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addPost(action) {
  console.log("addPosts");
  try {
    // const result = yield call(addPostsApi, action.data); //요청의 결과
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* addComment(action) {
  console.log("addComment");
  try {
    // const result = yield call(addPostsApi, action.data); //요청의 결과
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  console.log('watch_POST')
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  console.log('watch_COMMENT')
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}

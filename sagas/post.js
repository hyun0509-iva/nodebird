import axios from "axios";
import {
  all,
  call,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import shortid from "shortid";

function loadPostAPI(data) {
  // 비동기 처리 함수는 일반함수로 정의
  return axios.get("/api/posts", data);
}

function addPostAPI(data) {
  // 비동기 처리 함수는 일반함수로 정의
  return axios.post("/api/post", { content: data });
}

function removePostAPI(data) {
  return axios.post("/api/post", data);
}

function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostAPI, action.data); //요청의 결과
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* addPost(action) {
  console.log("addPosts");
  try {
    const result = yield call(addPostAPI, action.data); //요청의 결과
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* removePost(action) {
  console.log("removePosts");
  const id = shortid.generate();
  try {
    // const result = yield call(addPostsApi, action.data); //요청의 결과
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* addComment(action) {
  console.log("addComment");
  try {
    const result = yield call(addCommentAPI, action.data); //요청의 결과
    console.log({comment: result});
    yield put({  
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}

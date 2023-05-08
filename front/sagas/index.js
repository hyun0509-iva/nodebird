import axios from "axios";
import { all, call, delay, fork, put, take, takeEvery } from "redux-saga/effects";

function logInApi(data) {
  // 비동기 처리 함수는 일반함수로 정의
  return axios.post("api/login", data);
}

function logOutApi() {
  // 비동기 처리 함수는 일반함수로 정의
  return axios.post("api/login");
}

function addPostsApi(data) {
  // 비동기 처리 함수는 일반함수로 정의
  return axios.post("api/login", data);
}

function* logIn(action) {
  try {
    // const result = yield call(logInApi, action.data); //요청의 결과
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCESS",
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function* logOut() {
  try {
    // const result = yield call(logOutApi); //요청의 결과
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCESS",
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}
function* addPosts(action) {
  try {
    // const result = yield call(addPostsApi, action.data); //요청의 결과
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCESS",
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeEvery("LOG_IN_REQUEST", logIn);
}

function* watchLogOUT() {
  yield takeEvery("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  yield takeEvery("ADD_POST_REQUEST", addPosts);
}

export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOUT), fork(watchAddPost)]);
}

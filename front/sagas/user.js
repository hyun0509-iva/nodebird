import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../reducers/user";

function followApi(data) {
  // 비동기 처리 함수는 일반함수로 정의
  return axios.post("/api/follow", data);
}
function unFollowApi(data) {
  // 비동기 처리 함수는 일반함수로 정의
  return axios.post("/api/unfollow", data);
}

function logInApi(data) {
  // 비동기 처리 함수는 일반함수로 정의
  return axios.post("/api/login", data);
}

function logOutApi() {
  // 비동기 처리 함수는 일반함수로 정의
  return axios.post("/api/login");
}

function signUpApi(data) {
  return axios.post('/api/user', data);
}

function* follow(action) {
  try {
    // const result = yield call(followApi, action.data); //요청의 결과
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}
function* unfollow(action) {
  try {
    // const result = yield call(unFollowApi, action.data); //요청의 결과
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* logIn(action) {
  console.log("login");
  try {
    console.log("saga logIn");
    // const result = yield call(logInApi, action.data); //요청의 결과
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* logOut() {
  console.log("login");
  try {
    // const result = yield call(logOutApi); //요청의 결과
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* signUp() {
  try {
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOUT() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  console.log("rootsaga 실행");
  yield all([
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOUT),
    fork(watchSignUp),
  ]);
}

const g = watchLogIn();
console.log(g.next());

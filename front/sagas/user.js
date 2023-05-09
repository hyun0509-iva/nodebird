import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from "../reducers/user";

// function logInApi(data) {
//   // 비동기 처리 함수는 일반함수로 정의
//   return axios.post("api/login", data);
// }

// function logOutApi() {
//   // 비동기 처리 함수는 일반함수로 정의
//   return axios.post("api/login");
// }

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
      data: err.response.data,
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
      data: err.response.data,
    });
  }
}
function* watchLogIn() {
  console.log("watchLogIn");
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOUT() {
  console.log("watchLogOUT");
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  console.log("rootsaga 실행");
  yield all([fork(watchLogIn), fork(watchLogOUT)]);
}

const g = watchLogIn();
console.log(g.next());

import { all } from "axios";
import { delay, fork, put, takeLatest } from "redux-saga/effects";

// function addPostsApi(data) {
//   // 비동기 처리 함수는 일반함수로 정의
//   return axios.post("api/login", data);
// }

function* addPosts(action) {
  console.log('addPosts')
  try {
    // const result = yield call(addPostsApi, action.data); //요청의 결과
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCESS",
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPosts);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
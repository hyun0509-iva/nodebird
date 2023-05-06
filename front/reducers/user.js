import axios from "axios";

export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginAction = (data) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(loginRequestAction());
    axios
      .post("/api/login")
      .then((res) => dispatch(loginSucessAction(res.data)))
      .catch((err) => dispatch(loginFailureAction(err)));
  };
};

export const loginRequestAction = () => ({
  type: "LOG_IN_QEQUEST",
});
export const loginSucessAction = (data) => ({
  type: "LOG_IN",
  data,
});
export const loginFailureAction = (data) => ({
  type: "LOG_IN_FAILURE",
  data
});

export const logOutRequestAction = () => ({
  type: "Log_OUT_REQUEST",
});
export const logOutSucessAction = () => ({
  type: "Log_OUT_SUCCESS",
});
export const logOutFailureAction = () => ({
  type: "Log_OUT_FAILURE",
});

const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    case "Log_OUT":
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export const userState = (state) => state.user;
export default user;

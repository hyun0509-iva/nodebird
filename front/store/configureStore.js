import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";
import thunkMiddleware from "redux-thunk";
import reducer from "../reducers";

const loggerMidddleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.log({action, getState});
    return next(action);
  };

const configureStore = () => {
  const middlewares = [thunkMiddleware, loggerMidddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevToolsDevelopmentOnly(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;

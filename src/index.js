import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import allReducers from "./components/reducers/index";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
const store = createStore(allReducers, applyMiddleware(thunk));

//provider makes store available to app.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

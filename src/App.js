import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store"

import MainRouter from "./Router";

export default function App() {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
}

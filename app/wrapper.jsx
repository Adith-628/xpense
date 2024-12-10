"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";

const HomeLayout = ({ children }) => {
  return <div className="p-2 w-screen flex">{children}</div>;
};

const Wrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <HomeLayout>{children}</HomeLayout>
    </Provider>
  );
};

export default Wrapper;

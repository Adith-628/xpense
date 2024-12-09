"use client";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import Wrapper from "../wrapper";
import store from "../store";
import { decrement, increment } from "@/src/features/counter/counterSlice";

const page = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <PageWrapper>
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

const PageWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default page;

"use client";
import { useStore } from "@/src/store";
import React from "react";

const LoginPage = () => {
  const { user } = useStore();
  console.log(user, "user-----");

  return (
    <div>
      <h1>Login Page</h1>
      <div className="">Firebase Auth</div>
    </div>
  );
};

export default LoginPage;

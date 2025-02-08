"use client";
import LoginForm from "@/src/components/organisms/LoginForm";
import React, { useEffect } from "react";
import { initAuth } from "@/utils/auth";

const page = () => {
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;

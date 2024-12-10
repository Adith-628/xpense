"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "@/src/features/user/userSlice";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, status, error } = useSelector((state) => state.user);

  const handleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      dispatch(
        setUser({
          uid: response.user.uid,
          name: response.user.displayName,
          email: response.user.email,
          photoURL: response.user.photoURL,
        })
      );
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = () => {
    dispatch(clearUser());
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div className="">Firebase Auth</div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default LoginPage;

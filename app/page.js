"use client";

import { useState } from "react";
import { auth, provider, signInWithPopup } from "@/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import store from "./store";
import Wrapper from "./wrapper";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Sign in with Google
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div>
      <div className="">Firebase Google Auth</div>
      <div onClick={handleSignIn} className="">
        {user ? (
          <div>
            <Image
              src={user.photoURL}
              width={50}
              height={50}
              alt={user.displayName}
            />
            <p>{user.displayName}</p>
          </div>
        ) : (
          <p>Sign in with google</p>
        )}
      </div>
    </div>
  );
}

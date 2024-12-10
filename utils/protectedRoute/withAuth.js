"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useSelector((state) => state.user); // Get the user state from Redux
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace("/"); // Redirect to login if user is not authenticated
      }
    }, [user, router]);

    // Optionally, render a loading spinner while checking the user's authentication state
    if (!user) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

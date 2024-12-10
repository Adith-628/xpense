"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/src/features/user/userSlice";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user); // Get the user state from Redux
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        router.replace("/"); // Redirect to login if no user found
      } else if (!user) {
        // Sync Redux state with localStorage if Redux is empty
        dispatch(setUser(JSON.parse(storedUser)));
        setLoading(false);
      } else {
        setLoading(false);
      }
    }, [user, router, dispatch]);

    if (loading) {
      return <p>Loading...</p>; // Render a loading indicator
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

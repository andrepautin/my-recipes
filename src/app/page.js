"use client";

import Link from "next/link";
import { currentUserContext } from "./context/userContext";
import { useContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
export default function Home() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
    }
  }, [hasMounted]);

  if (!hasMounted) {
    return (
      <div className="flex justify-center mt-32">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="mt-5">
      {!currentUser && (
        <>
          <h1 className="text-center">
            Welcome, please log in or sign up to continue.
          </h1>
          <div className="flex justify-center mt-5">
            <Link href="/login" className="mr-5">
              Login
            </Link>
            <Link href="/signup">Sign Up</Link>
          </div>
        </>
      )}
    </div>
  );
}

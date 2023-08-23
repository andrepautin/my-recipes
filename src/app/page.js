"use client";
import Link from "next/link";
import { useContext } from "react";
import { currentUserContext } from "./context/userContext";
import { useRouter } from "next/navigation";
export default function Home() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const router = useRouter();
  if (currentUser) {
    router.push("/dashboard");
  }
  return (
    <div className="mt-5">
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
    </div>
  );
}

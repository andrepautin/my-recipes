"use client";
import { createContext, useState } from "react";
export const currentUserContext = createContext();
export default function CurrentUserContext({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    let user;
    if (typeof window !== "undefined") {
      user = localStorage.getItem("user");
    }
    return user ? JSON.parse(user) : "";
  });
  return (
    <currentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </currentUserContext.Provider>
  );
}

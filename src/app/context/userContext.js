"use client";
import { getCookie } from "cookies-next";
import { createContext, useState } from "react";
export const currentUserContext = createContext();
export default function CurrentUserContext({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const userCookie = getCookie("currentUser");
    return userCookie ? JSON.parse(userCookie) : "";
  });

  return (
    <currentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </currentUserContext.Provider>
  );
}

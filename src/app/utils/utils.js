"use client";
import { useContext } from "react";
import { currentUserContext } from "../context/userContext";
import { useRouter } from "next/navigation";

export const useHelper = () => {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser();
    router.push("/");
  };

  const handleFormChange = (evt, setFormData) => {
    evt.preventDefault();
    let value = evt.target.value;
    let name = evt.target.name;
    setFormData((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  return { handleFormChange, handleLogout };
};

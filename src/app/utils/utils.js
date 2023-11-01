"use client";
import { useContext } from "react";
import { currentUserContext } from "../context/userContext";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import axios from "axios";

export const useHelper = () => {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);

  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("currentUser");
    // get all cookies and delete each
    deleteCookie("token");
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

  const uploadFileAWS = async (recipeId, userId) => {
    let { data } = await axios.post("/api/s3", {
      name: recipeId + "-" + userId,
      type: file.type,
    });
    const url = await data.url;
    const putImgRes = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });
    setFile(null);
    return url;
  };

  return { handleFormChange, handleLogout, uploadFileAWS };
};

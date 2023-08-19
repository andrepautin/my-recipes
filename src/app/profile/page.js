"use client";

import { getCookie } from "cookies-next";
import { useContext, useState } from "react";
import { useHelper } from "../utils/utils";
import axios from "axios";
import { currentUserContext } from "../context/userContext";
import { useRouter } from "next/navigation";

const FORM_OPTIONS = ["userName", "firstName", "lastName", "email"];

export default function Profile() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const [formData, setFormData] = useState({
    userName: currentUser?.userName,
    email: currentUser?.email,
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
  });

  const { handleFormChange, handleLogout } = useHelper();
  const router = useRouter();

  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const token = getCookie("token");
    const headers = { authorization: "Bearer " + token };
    const response = await axios.put(
      "/api/users",
      {
        userId: currentUser?.id,
        updates: formData,
      },
      { headers }
    );
    // handle error here
    // const {user, error} = response.data
    setCurrentUser(response.data.user);
    router.refresh();
  };

  const handleChange = (evt) => {
    handleFormChange(evt, setFormData);
  };

  const handleDelete = async (evt) => {
    evt.preventDefault();
    const token = getCookie("token");
    const headers = { authorization: "Bearer " + token };
    const response = await axios.post(
      "/api/users/delete",
      {
        userId: currentUser?.id,
      },
      { headers }
    );
    console.log("RES--->", response);
    if (response.data.message) {
      handleLogout();
    }
  };
  return (
    <div className="flex justify-center">
      <form onSubmit={handleUpdate} className="flex flex-col">
        {FORM_OPTIONS.map((option) => (
          <div key={option} className="mb-5">
            <label>
              {option[0].toUpperCase() + option.slice(1).toLowerCase()}
            </label>
            <input
              className="border-2 border-zinc-950"
              type={option === "email" ? "email" : "text"}
              id={option}
              name={option}
              value={formData?.[option]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="text-center">
          Submit
        </button>
        <button type="text" className="text-center" onClick={handleDelete}>
          Delete Account
        </button>
      </form>
    </div>
  );
}

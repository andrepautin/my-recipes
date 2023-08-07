"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { currentUserContext } from "../context/userContext";
import { useHelper } from "../utils/utils";
import { CircularProgress } from "@mui/material";
import { getCookie } from "cookies-next";

const FORM_OPTIONS = [
  "firstName",
  "lastName",
  "userName",
  "email",
  "password",
  "confirmPassword",
];

export default function SignUp() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { handleFormChange } = useHelper();

  const handleChange = (evt) => {
    handleFormChange(evt, setFormData);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword)
        throw new Error("Passwords do not match.");
      delete formData.confirmPassword;
      setIsLoading(true);
      await axios.post("/api/users", formData);
      const user = JSON.parse(getCookie("currentUser"));
      setCurrentUser(user);
      router.push(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col mt-10">
          <h1 className="my-5 text-center">
            Please fill out the information below.
          </h1>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col">
              {FORM_OPTIONS.map((option) => (
                <div key={option} className="mb-5">
                  <input
                    placeholder={
                      option[0].toUpperCase() + option.slice(1).toLowerCase()
                    }
                    className="border-2 border-zinc-950"
                    type={
                      option === "password" || option === "confirmPassword"
                        ? "password"
                        : option === "email"
                        ? "email"
                        : "text"
                    }
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
            </form>
          </div>
          <Link href="/login" className="text-center mt-5">
            Back to Login
          </Link>
        </div>
      ) : (
        <div className="flex justify-center mt-32">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

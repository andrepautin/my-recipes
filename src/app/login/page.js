"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { currentUserContext } from "../context/userContext";
import { useHelper } from "../utils/utils";
import { CircularProgress } from "@mui/material";

import { getCookie, setCookie } from "cookies-next";

const FORM_OPTIONS = ["userName", "password"];

export default function Login() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const [hasMounted, setHasMounted] = useState(false);
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { handleFormChange } = useHelper();

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  const handleChange = (evt) => {
    handleFormChange(evt, setFormData);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setIsLoading(true);
      await axios.post(`/api/users`, formData);
      const currentUser = JSON.parse(getCookie("currentUser"));
      setCurrentUser(currentUser);
      router.push("/dashboard");
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
                    type={option === "password" ? "password" : "text"}
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
          <Link href="/signup" className="text-center mt-5">
            Back to Sign Up
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

"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { currentUserContext } from "../context/userContext";
import { useHelper } from "../utils/utils";
import { Alert } from "@mui/material";

import { getCookie } from "cookies-next";
import CustomLoading from "../components/customloading";

const FORM_OPTIONS = ["userName", "password"];

export default function Login() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const [hasMounted, setHasMounted] = useState(false);
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { handleFormChange } = useHelper();

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;
  if (hasMounted && currentUser) {
    router.push("/dashboard");
  }

  const handleChange = (evt) => {
    handleFormChange(evt, setFormData);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    const response = await axios.post(`/api/users`, formData);
    const { user, error } = response.data;
    if (error) {
      setIsLoading(false);
      setError(error);
    } else {
      const currentUser = JSON.parse(getCookie("currentUser"));
      setCurrentUser(currentUser);
      router.push("/dashboard");
    }
  };

  return (
    <>
      {error && (
        <Alert onClose={() => setError(false)} severity="error">
          {error}
        </Alert>
      )}
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
          <CustomLoading message="User" />
        </div>
      )}
    </>
  );
}

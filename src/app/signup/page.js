"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { currentUserContext } from "../context/userContext";
import { useHelper } from "../utils/utils";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getCookie } from "cookies-next";
import CustomLoading from "../components/customloading";

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Paper
            elevation={24}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              bgcolor: "#F4BF64",
              mt: 3,
              width: "70%",
              minWidth: "300px",
              maxWidth: "600px",
            }}
          >
            <Typography sx={{ textAlign: "center", mt: 2 }}>
              Please fill out the information below.
            </Typography>
            <FormControl>
              {FORM_OPTIONS.map((option) => (
                <Grid
                  key={option}
                  container
                  columnSpacing={1}
                  sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                >
                  <Grid>
                    <FormLabel>
                      {option[0].toUpperCase() + option.slice(1).toLowerCase()}
                    </FormLabel>
                    <Box>
                      <TextField
                        placeholder={
                          option[0].toUpperCase() +
                          option.slice(1).toLowerCase()
                        }
                        type={
                          option === "password" || option === "confirmPassword"
                            ? "password"
                            : "text"
                        }
                        id={option}
                        name={option}
                        value={formData?.[option]}
                        onChange={handleChange}
                        required={true}
                        sx={{ bgcolor: "#F6E6B4" }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: "auto",
                my: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: "165px",
                  "&.MuiButtonBase-root": {
                    bgcolor: "#6A9B6B",
                  },
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "green",
                  },
                  mb: 1,
                }}
                type="submit"
              >
                Submit
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "165px",
                  "&.MuiButtonBase-root": {
                    bgcolor: "#2C87B5",
                  },
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "#0C6D9E",
                  },
                  mb: 1,
                }}
              >
                <Link href="/login">Back to Login</Link>
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "165px",
                  "&.MuiButtonBase-root": {
                    bgcolor: "#2C87B5",
                  },
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "#0C6D9E",
                  },
                  mb: 1,
                }}
              >
                <Link href={{ pathname: "/login", name: "demo" }}>
                  Demo Login
                </Link>
              </Button>
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box>
          <CustomLoading message="New User" />
        </Box>
      )}
    </>
  );
}

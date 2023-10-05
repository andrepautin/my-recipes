"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { currentUserContext } from "../context/userContext";
import { useHelper } from "../utils/utils";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

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
  const searchParams = useSearchParams();
  const { handleFormChange } = useHelper();

  useEffect(() => {
    setHasMounted(true);
    if (searchParams.get("name") === "demo") {
      setFormData({ userName: "demouser1", password: "d3m0only!" });
    }
  }, [searchParams]);

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

  const handleDemo = async () => {
    setIsLoading(true);
    const response = await axios.post(`/api/users`, {
      userName: "demouser1",
      password: "d3m0only!",
    });
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
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
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
              Please enter your credentials in the fields below.
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
                        type={option === "password" ? "password" : "text"}
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
                type="submit"
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
                <Link href="/signup">Back to Sign Up</Link>
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
          <CustomLoading message="User" />
        </Box>
      )}
    </>
  );
}

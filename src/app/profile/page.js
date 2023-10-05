"use client";

import { getCookie } from "cookies-next";
import { useContext, useState } from "react";
import { useHelper } from "../utils/utils";
import axios from "axios";
import { currentUserContext } from "../context/userContext";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import CustomLoading from "../components/customloading";

const FORM_OPTIONS = ["userName", "firstName", "lastName", "email"];

export default function Profile() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const [formData, setFormData] = useState({
    userName: currentUser?.userName,
    email: currentUser?.email,
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
  });
  const [loading, setLoading] = useState(false);

  const { handleFormChange, handleLogout } = useHelper();
  const router = useRouter();

  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const token = getCookie("token");
    const headers = { authorization: "Bearer " + token };
    setLoading(true);
    const response = await axios.put(
      "/api/users",
      {
        userId: currentUser?.id,
        updates: formData,
      },
      { headers }
    );
    setLoading(false);
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
    <>
      {loading ? (
        <CustomLoading message="Profile" />
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          component="form"
          onSubmit={handleUpdate}
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
            <FormControl>
              {FORM_OPTIONS.map((option) => (
                <Grid key={option} container columnSpacing={1}>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mt: 2,
                      ml: "auto",
                      mr: "auto",
                    }}
                  >
                    <FormLabel>
                      {option[0].toUpperCase() + option.slice(1).toLowerCase()}
                    </FormLabel>
                    <TextField
                      type={option === "email" ? "email" : "text"}
                      id={option}
                      name={option}
                      value={formData?.[option]}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Grid>
              ))}
              <Tooltip
                title={
                  currentUser?.userName === "demouser1" &&
                  "These features are disabled in demo mode."
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mx: "auto",
                    my: 2,
                  }}
                >
                  <Tooltip title="Update account">
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        width: "200px",
                        "&.MuiButtonBase-root": {
                          bgcolor: "#6A9B6B",
                        },
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "green",
                        },
                        mb: 1,
                      }}
                      disabled={
                        currentUser?.userName === "demouser1" ? true : false
                      }
                    >
                      Update Account
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete account">
                    <Button
                      variant="contained"
                      sx={{
                        width: "200px",
                        "&.MuiButtonBase-root": {
                          bgcolor: "#CD5D4C",
                        },
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "red",
                        },
                      }}
                      onClick={handleDelete}
                      disabled={
                        currentUser?.userName === "demouser1" ? true : false
                      }
                    >
                      Delete Account
                    </Button>
                  </Tooltip>
                </Box>
              </Tooltip>
            </FormControl>
          </Paper>
        </Box>
      )}
    </>
  );
}

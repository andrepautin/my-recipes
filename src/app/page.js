"use client";
import Link from "next/link";
import { useContext } from "react";
import { currentUserContext } from "./context/userContext";
import { useRouter } from "next/navigation";
import { Box, Button, Paper, Typography } from "@mui/material";
export default function Home() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const router = useRouter();
  if (currentUser) {
    router.push("/dashboard");
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={24}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "#F4BF64",
          mt: 10,
          width: "50%",
          minWidth: "300px",
          maxWidth: "500px",
        }}
      >
        <Typography sx={{ textAlign: "center", mt: 2 }}>
          Welcome, please log in or sign up to continue.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
          <Button
            variant="contained"
            sx={{
              width: "100px",
              "&.MuiButtonBase-root": {
                bgcolor: "#2C87B5",
              },
              "&.MuiButtonBase-root:hover": {
                bgcolor: "#0C6D9E",
              },
              mr: 1,
            }}
          >
            <Link href={{ pathname: "/login" }}>Login</Link>
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "100px",
              "&.MuiButtonBase-root": {
                bgcolor: "#2C87B5",
              },
              "&.MuiButtonBase-root:hover": {
                bgcolor: "#0C6D9E",
              },
            }}
          >
            <Link href={{ pathname: "/signup" }}>Sign Up</Link>
          </Button>
        </Box>
        <Button
          variant="contained"
          sx={{
            width: "100px",
            "&.MuiButtonBase-root": {
              bgcolor: "#2C87B5",
            },
            "&.MuiButtonBase-root:hover": {
              bgcolor: "#0C6D9E",
            },
            mr: "auto",
            ml: "auto",
            mb: 2,
          }}
        >
          <Link
            href={{
              pathname: "/login",
              query: { name: "demo" },
            }}
          >
            Demo
          </Link>
        </Button>
      </Paper>
    </Box>
  );
}

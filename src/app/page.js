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
            sx={{
              "&.MuiButton-root:hover": {
                color: "white",
                backgroundColor: "transparent",
              },
            }}
          >
            <Link href={{ pathname: "/login" }}>Login</Link>
          </Button>
          <Button
            sx={{
              "&.MuiButton-root:hover": {
                color: "white",
                backgroundColor: "transparent",
              },
            }}
          >
            <Link href={{ pathname: "/signup" }}>Sign Up</Link>
          </Button>
        </Box>
        <Button
          sx={{
            "&.MuiButton-root:hover": {
              color: "white",
              backgroundColor: "transparent",
            },
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

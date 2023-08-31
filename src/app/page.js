"use client";
import Link from "next/link";
import { useContext } from "react";
import { currentUserContext } from "./context/userContext";
import { useRouter } from "next/navigation";
import { Paper, Typography } from "@mui/material";
export default function Home() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const router = useRouter();
  if (currentUser) {
    router.push("/dashboard");
  }
  return (
    <div className="flex justify-center">
      <Paper
        elevation={24}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "#F4BF64",
          mt: 10,
          width: "50%",
          // set breakpoints and max width/height
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          Welcome, please log in or sign up to continue.
        </Typography>
        <div className="flex justify-center mt-5">
          <Link href="/login" className="mr-5">
            Login
          </Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </Paper>
    </div>
  );
}

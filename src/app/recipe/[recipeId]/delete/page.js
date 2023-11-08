"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { redirect, useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { currentUserContext } from "@/app/context/userContext";

export default function DeleteRecipe({ params }) {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const [deleteDialog, setDeleteDialog] = useState(true);
  const [loading, setLoading] = useState(false);

  const recipeId = params?.recipeId;
  const router = useRouter();

  useEffect(() => {
    if (!deleteDialog) {
      router.back();
    }
  }, [deleteDialog, recipeId, router]);

  const handleDeleteRecipe = async (evt) => {
    evt.preventDefault();
    const token = getCookie("token");
    const headers = { authorization: "Bearer " + token };
    setLoading(true);
    const response = await axios.post(
      `/api/${currentUser?.id}/recipes/${recipeId}`,
      {},
      {
        headers,
      }
    );
    console.log("R--->", response);
    setLoading(false);
    const { message, error } = response.data;
    if (message) {
      console.log("D MSG--->", message);
      // on deletion, only want to nav to dashboard if from details page, otherwise stay on all recipes page
      router.push("/dashboard");
    } else {
      console.log("D ERR--->", error);
    }
  };

  const handleClose = (evt) => {
    evt.preventDefault();
    setDeleteDialog(false);
  };

  return (
    <Box>
      <Dialog open={deleteDialog} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this recipe?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All data will be deleted forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDeleteRecipe} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

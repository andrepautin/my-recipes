"use client";
import { Button, Tooltip } from "@mui/material";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteRecipe({ userId, recipeId, currentUser }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDeleteRecipe = async (evt) => {
    evt.preventDefault();
    const token = getCookie("token");
    const headers = { authorization: "Bearer " + token };
    setLoading(true);
    const response = await axios.post(
      `/api/${userId}/recipes/${recipeId}`,
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
      router.push("/dashboard");
    } else {
      console.log("D ERR--->", error);
    }
  };
  return (
    <Tooltip
      title={
        currentUser?.userName === "demouser1"
          ? "This feature is disabled in demo mode."
          : "Delete this recipe."
      }
    >
      <div>
        {loading ? (
          <h1>Deleting Recipe...</h1>
        ) : (
          <Button
            onClick={handleDeleteRecipe}
            type="button"
            disabled={currentUser?.userName === "demouser1" ? true : false}
          >
            Delete Recipe
          </Button>
        )}
      </div>
    </Tooltip>
  );
}

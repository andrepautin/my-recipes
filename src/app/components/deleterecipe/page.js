"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteRecipe({ userId, recipeId }) {
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
    <div>
      {loading ? (
        <h1>Deleting Recipe...</h1>
      ) : (
        <button onClick={handleDeleteRecipe} type="button">
          Delete Recipe
        </button>
      )}
    </div>
  );
}

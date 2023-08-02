"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { currentUserContext } from "../../context/userContext";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import RecipeCardList from "@/app/components/recipecardlist";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const [recentlyCreated, setRecentlyCreated] = useState();
  const [recentlyUpdated, setRecentlyUpdated] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecentCreatedAndUpdated = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const headers = { authorization: "Bearer " + token };
      const createdRecipes = await axios.get(
        `/api/${currentUser?.id}/recipes/recentlycreated`,
        { headers }
      );
      const updatedRecipes = await axios.get(
        `/api/${currentUser?.id}/recipes/recentlyupdated`,
        { headers }
      );

      if (createdRecipes && updatedRecipes) {
        setRecentlyCreated(createdRecipes.data.recipes);
        setRecentlyUpdated(updatedRecipes.data.recipes);
        setIsLoading(false);
      }
    };

    if (currentUser) {
      getRecentCreatedAndUpdated();
    }
  }, [currentUser]);

  return (
    <div className="mt-20">
      {isLoading && (
        <div className="flex justify-center mt-20">
          <CircularProgress />
        </div>
      )}
      {recentlyCreated && !isLoading && (
        <div className="mb-5">
          <h1 className="text-center mb-5">Recently Created Recipes</h1>
          <RecipeCardList recipes={recentlyCreated} />
        </div>
      )}
      {recentlyUpdated && !isLoading && (
        <div>
          <h1 className="text-center mb-5">Recently Updated Recipes</h1>
          <RecipeCardList recipes={recentlyUpdated} />
        </div>
      )}
    </div>
  );
}

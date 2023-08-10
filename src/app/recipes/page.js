"use client";
import axios from "axios";
import AllRecipesList from "../components/allrecipeslist";
import { useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { currentUserContext } from "../context/userContext";

export default function Recipes() {
  const [allRecipes, setAllRecipes] = useState();
  const [currentUser, setcurrentUser] = useContext(currentUserContext);
  const [sortBy, setSortBy] = useState("desc");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState("");
  console.log("RECIPES SET--->", allRecipes);
  useEffect(() => {
    const token = getCookie("token");
    const headers = { authorization: "Bearer " + token };
    async function getAllRecipes() {
      try {
        const recipesData = await axios.get(`/api/${currentUser?.id}/recipes`, {
          headers,
        });
        const recipes = recipesData?.data?.recipes;
        setAllRecipes(recipes);
      } catch (error) {
        console.log("ERR--->", error);
        return { error };
      }
    }
    getAllRecipes();
  }, [currentUser]);

  const handleSort = (evt) => {
    evt.preventDefault();
    if (sortBy === "asc") {
      const ascRecipes = allRecipes?.sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
      setSortBy("desc");
      setAllRecipes([...ascRecipes]);
    } else {
      const descRecipes = allRecipes?.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
      setSortBy("asc");
      setAllRecipes([...descRecipes]);
    }
  };

  return (
    // WILL HAVE TO BE CLIENT SIDE COMPONENT AND FETCH RESULTS IN USEEFFECT
    // TOOLBAR COMPONENT
    // LIST ITEMS WILL HAVE EDIT, DELETE FUNCTIONALITIES
    // CONTAINER THAT RENDERS LIST OF ALL RECIPES
    // LIST COMPONENT STILL ITS OWN
    // WILL HANDLE SEARCH, FILTER/SORT
    // USER SHOULD BE ABLE TO FILTER BY TYPE (FOOD, DRINK),
    // MEAL TYPE (BFAST, LUNCH, DINNER, SNACK) AND SEARCH BY NAME
    // SORT ALPHABETICALLY
    // SHOULD BE ABLE TO DElETE FROM THIS COMP AS WELL
    // IF ITEM CLICKED, SHOULD GO TO DETAIL PAGE FOR THAT RECIPE (INDEX WILL BE PART OF INDIVIDUAL COMP)
    <div>
      {allRecipes && (
        <div>
          <button onClick={handleSort}>Sort</button>
          <AllRecipesList recipes={allRecipes} />
        </div>
      )}
    </div>
  );
}

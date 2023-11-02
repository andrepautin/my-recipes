"use client";
import axios from "axios";
import AllRecipesList from "../components/allrecipeslist";
import { useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { currentUserContext } from "../context/userContext";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { TYPE_OPTIONS, MEAL_TYPE_OPTIONS } from "../newrecipe/page";
import { ImportExport } from "@mui/icons-material";

const SORT_OPTIONS = ["Date", "Name"];
const FILTER_BY_OPTIONS = ["type", "mealType"];

export default function Recipes() {
  const [allRecipes, setAllRecipes] = useState();
  const [currentUser, setcurrentUser] = useContext(currentUserContext);
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortBy, setSortBy] = useState("Date");
  const [sortedRecipes, setSortedRecipes] = useState();
  const [filteredRecipes, setFilteredRecipes] = useState();
  const [filterByType, setFilterByType] = useState("None");
  const [filterByMealType, setFilterByMealType] = useState("None");
  const [search, setSearch] = useState("");

  const isMinWidth = useMediaQuery("(min-width:725px)");

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

  useEffect(() => {
    let ascRecipes;
    let descRecipes;
    if (sortDirection === "asc") {
      if (filteredRecipes) {
        console.log(sortBy);
        if (sortBy === "Date") {
          console.log("ASC DATE FILTERED");
          ascRecipes = filteredRecipes
            ?.slice()
            .sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
        } else {
          console.log("ASC NAME FILTERED");
          ascRecipes = filteredRecipes
            ?.slice()
            .sort((a, b) => a.name.localeCompare(b.name));
        }
        if (ascRecipes) {
          setSortedRecipes(ascRecipes);
        }
      } else {
        if (sortBy === "Date") {
          console.log("ASC DATE ALL");
          ascRecipes = allRecipes
            ?.slice()
            .sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
        } else {
          console.log("ASC NAME ALL");
          ascRecipes = allRecipes
            ?.slice()
            .sort((a, b) => a.name.localeCompare(b.name));
        }
        if (ascRecipes) {
          setSortedRecipes(ascRecipes);
        }
      }
    } else if (sortDirection === "desc") {
      if (filteredRecipes) {
        if (sortBy === "Date") {
          console.log("DESC DATE FILTERED");
          descRecipes = filteredRecipes
            ?.slice()
            .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
        } else {
          console.log("DESC NAME FILTERED");
          descRecipes = filteredRecipes
            ?.slice()
            .sort((a, b) => b.name.localeCompare(a.name));
        }
        if (descRecipes) {
          setSortedRecipes(descRecipes);
        }
      } else {
        if (sortBy === "Date") {
          console.log("DESC DATE ALL");
          descRecipes = allRecipes?.sort(
            (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
          );
        } else {
          console.log("DESC NAME ALL");
          descRecipes = allRecipes
            ?.slice()
            .sort((a, b) => b.name.localeCompare(a.name));
        }
        if (descRecipes) {
          setSortedRecipes(descRecipes);
        }
      }
    }
  }, [sortDirection, allRecipes, filteredRecipes, sortBy]);

  useEffect(() => {
    let filtered;
    if (filterByType === "None" && filterByMealType === "None") {
      console.log("NO FILTERS");
    } else if (filterByType !== "None" && filterByMealType !== "None") {
      filtered = allRecipes?.filter(
        (recipe) =>
          recipe.type === filterByType && recipe.mealType === filterByMealType
      );
    } else if (filterByType !== "None") {
      console.log("TYPE FILTER");
      filtered = allRecipes?.filter((recipe) => recipe.type === filterByType);
    } else {
      console.log("MEAL TYPE FILTER");
      filtered = allRecipes?.filter(
        (recipe) => recipe.mealType === filterByMealType
      );
    }

    if (search !== "") {
      filtered
        ? (filtered = filtered?.filter((f) => f.name.includes(search)))
        : (filtered = allRecipes?.filter((r) => r.name.includes(search)));
    }

    console.log("FILTERED SEARCH--->", filtered);
    filtered ? setFilteredRecipes(filtered) : setFilteredRecipes();
  }, [allRecipes, filterByType, filterByMealType, search]);

  const handleSortDirection = (evt) => {
    evt.preventDefault();
    sortDirection === "asc"
      ? setSortDirection("desc")
      : setSortDirection("asc");
  };

  const handleFilterChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    name === "sortBy"
      ? setSortBy(value)
      : name === "type"
      ? setFilterByType(value)
      : setFilterByMealType(value);
  };

  const handleResetFilters = (evt) => {
    evt.preventDefault();
    setSearch("");
    setFilterByType("None");
    setFilterByMealType("None");
    setSortBy("Date");
  };

  return (
    // move filter logic to utils and pass filters as props
    <Box
      sx={{
        mt: 5,
        marginLeft: "auto",
        marginRight: "auto",
        minWidth: 300,
        width: isMinWidth ? "70%" : "100%",
        maxWidth: 600,
      }}
    >
      {allRecipes && (
        <Paper
          elevation={24}
          sx={{
            bgcolor: "#F4BF64",
            width: "100%",
          }}
        >
          <Box>
            {allRecipes?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <IconButton onClick={handleSortDirection} sx={{ height: 25 }}>
                    <ImportExport />
                    <Typography sx={{ fontSize: !isMinWidth && "small" }}>
                      {sortDirection === "asc" ? "ASC" : "DESC"}
                    </Typography>
                  </IconButton>
                  <TextField
                    name="search"
                    size="small"
                    sx={{
                      backgroundColor: "white",
                      maxWidth: 130,
                      mt: isMinWidth && 1,
                    }}
                    placeholder="Search"
                    onChange={(evt) => setSearch(evt.target.value)}
                    value={search}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel
                    sx={{
                      textAlign: "center",
                      fontSize: !isMinWidth && "small",
                    }}
                  >
                    Sort By
                  </FormLabel>
                  <Select
                    name="sortBy"
                    onChange={handleFilterChange}
                    required
                    value={sortBy}
                    sx={{
                      bgcolor: "white",
                      m: 1,
                      minWidth: isMinWidth ? 110 : 76,
                      height: 40,
                    }}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                {FILTER_BY_OPTIONS.map((filter) => (
                  <Box
                    key={filter}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <FormLabel
                      sx={{
                        textAlign: "center",
                        fontSize: !isMinWidth && "small",
                      }}
                    >
                      Filter{" "}
                      {filter[0].toUpperCase() + filter.slice(1).toLowerCase()}
                    </FormLabel>
                    <Select
                      name={filter === "type" ? "type" : "mealType"}
                      onChange={handleFilterChange}
                      required
                      value={
                        filter === "type" ? filterByType : filterByMealType
                      }
                      sx={{
                        bgcolor: "white",
                        m: 1,
                        minWidth: isMinWidth ? 110 : 76,
                        height: 40,
                      }}
                    >
                      {filter === "type"
                        ? ["None", ...TYPE_OPTIONS].map((t) => (
                            <MenuItem key={t} value={t}>
                              {t}
                            </MenuItem>
                          ))
                        : ["None", ...MEAL_TYPE_OPTIONS].map((mt) => (
                            <MenuItem key={mt} value={mt}>
                              {mt}
                            </MenuItem>
                          ))}
                    </Select>
                  </Box>
                ))}
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={handleResetFilters}>Reset Filters</Button>
            </Box>
            <AllRecipesList
              recipes={sortedRecipes ? sortedRecipes : allRecipes}
            />
          </Box>
        </Paper>
      )}
    </Box>
  );
}

"use client";

import { useContext, useState } from "react";
import { currentUserContext } from "../context/userContext";
import { useHelper } from "../utils/utils";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Paper,
  Select,
  TextField,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";

import CustomLoading from "../components/customloading";

export const FORM_SINGLE_OPTIONS = ["name", "type", "mealType"];

export const TYPE_OPTIONS = ["food", "drink"];

export const MEAL_TYPE_OPTIONS = [
  "breakfast",
  "lunch",
  "snack",
  "dinner",
  "dessert",
  "any",
];

export const FORM_ARRAY_OPTIONS = ["tastes", "ingredients", "instructions"];

export default function NewRecipe() {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const [formData, setFormData] = useState({
    name: "",
    ingredients: [""],
    instructions: [""],
    tastes: [""],
    type: TYPE_OPTIONS[0],
    mealType: MEAL_TYPE_OPTIONS[0],
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

  const { handleFormChange } = useHelper();
  const router = useRouter();

  const selectFile = (evt) => {
    setFile(evt.target.files[0]);
  };

  // can move out of component and pass needed params (recipeId, currentUser Id, file, and setFile states) -> return just signedUrl
  const uploadFileAWS = async (recipeId) => {
    let { data } = await axios.post("/api/s3", {
      name: recipeId + "-" + currentUser.id,
      type: file.type,
    });
    const url = await data.url;
    const putImgRes = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });
    setFile(null);
    return url;
  };

  const handleOptionAdd = (evt) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setFormData((oldData) => {
      return {
        ...oldData,
        [name]: [...formData[name], value],
      };
    });
  };

  const handleOptionChange = (evt, index) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    let list = [...formData[name]];
    list[index] = value;
    setFormData((oldData) => {
      return {
        ...oldData,
        [name]: [...list],
      };
    });
  };

  const handleRemoveItem = (evt, index) => {
    evt.preventDefault();
    const name = evt.target.name;
    let list = [...formData[name]];
    list.splice(index, 1);
    setFormData((oldData) => {
      return {
        ...oldData,
        [name]: [...list],
      };
    });
  };

  const handleChange = (evt) => {
    handleFormChange(evt, setFormData);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const token = getCookie("token");
    const headers = { authorization: "Bearer " + token };
    setLoading(true);
    const response = await axios.post(
      `/api/${currentUser?.id}/recipes`,
      formData,
      { headers }
    );
    const { recipe, error } = response.data;
    console.log("R--->", recipe);
    if (error) {
      console.log(error);
    }
    if (file && recipe) {
      const imgSrc = await uploadFileAWS(recipe?.id);
      const uploadImageResult = await axios.put(
        `/api/${currentUser?.id}/recipes/${recipe?.id}`,
        { imgSrc },
        { headers }
      );
      setLoading(false);
      router.push(`/recipe/${recipe.id}`);
    } else {
      setLoading(false);
      router.push(`/recipe/${recipe.id}`);
    }
  };
  return (
    <>
      {loading ? (
        <CustomLoading message="New Recipe" />
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Paper
            elevation={24}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              bgcolor: "#F4BF64",
              mt: 3,
              mb: 3,
              width: "70%",
              minWidth: "300px",
              maxWidth: "600px",
            }}
          >
            <FormLabel sx={{ mt: 2, ml: 2 }}>Upload Recipe Image</FormLabel>
            <input
              className="ml-4"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={(evt) => selectFile(evt)}
            />
            <FormControl onSubmit={handleSubmit}>
              {FORM_SINGLE_OPTIONS.map((option) => (
                <Grid
                  key={option}
                  container
                  columnSpacing={1}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    mt: 2,
                    ml: 2,
                  }}
                >
                  <Grid>
                    <FormLabel>
                      {option[0].toUpperCase() + option.slice(1).toLowerCase()}
                    </FormLabel>
                    <Box sx={{ mt: 1 }}>
                      {option === "name" ? (
                        <TextField
                          name={option}
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          sx={{ bgcolor: "white" }}
                        />
                      ) : (
                        <FormControl>
                          <Select
                            name={option === "type" ? "type" : "mealType"}
                            onChange={handleChange}
                            required
                            value={
                              option === "type"
                                ? formData.type
                                : formData.mealType
                            }
                            sx={{ minWidth: "194px", bgcolor: "white", mt: 1 }}
                          >
                            {option === "type"
                              ? TYPE_OPTIONS.map((t) => (
                                  <MenuItem key={t} value={t}>
                                    {t}
                                  </MenuItem>
                                ))
                              : MEAL_TYPE_OPTIONS.map((mt) => (
                                  <MenuItem key={mt} value={mt}>
                                    {mt}
                                  </MenuItem>
                                ))}
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              ))}
              {FORM_ARRAY_OPTIONS.map((option) => (
                <Grid
                  key={option}
                  container
                  columnSpacing={1}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    mt: 2,
                    ml: 2,
                  }}
                >
                  <Grid>
                    <FormLabel>
                      {option[0].toUpperCase() + option.slice(1).toLowerCase()}
                    </FormLabel>
                    <Box>
                      {formData[option].map((ing, index) => (
                        <Box key={index} sx={{ display: "flex", mt: 1 }}>
                          <TextareaAutosize
                            name={option}
                            type="text"
                            value={formData[option][index]}
                            onChange={(e) => handleOptionChange(e, index)}
                            required
                          />
                          {formData[option].length > 1 && (
                            <Button
                              name={option}
                              onClick={(e) => handleRemoveItem(e, index)}
                              variant="contained"
                              sx={{
                                width: "75px",
                                maxHeight: "20px",
                                ml: 1,
                                "&.MuiButtonBase-root": {
                                  bgcolor: "#CD5D4C",
                                },
                                "&.MuiButtonBase-root:hover": {
                                  bgcolor: "red",
                                },
                              }}
                            >
                              Remove
                            </Button>
                          )}
                        </Box>
                      ))}
                      <Tooltip title={`Add more ${option}`}>
                        <Box>
                          <Button
                            variant="contained"
                            name={option}
                            type="button"
                            onClick={handleOptionAdd}
                            sx={{
                              mt: 1,
                              width: "180px",
                              "&.MuiButtonBase-root": {
                                bgcolor: "#2C87B5",
                              },
                              "&.MuiButtonBase-root:hover": {
                                bgcolor: "#0C6D9E",
                              },
                            }}
                          >
                            Add{" "}
                            {option[0].toUpperCase() +
                              option.slice(1).toLowerCase()}
                          </Button>
                        </Box>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Grid>
              ))}
              <Tooltip
                title={
                  currentUser?.userName === "demouser1"
                    ? "This feature is disabled in demo mode."
                    : "Add your new recipe!"
                }
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={
                      currentUser?.userName === "demouser1" ? true : false
                    }
                    sx={{
                      mt: 2,
                      mb: 2,
                      "&.MuiButtonBase-root": {
                        bgcolor: "#6A9B6B",
                      },
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "green",
                      },
                    }}
                  >
                    Add Recipe
                  </Button>
                </Box>
              </Tooltip>
            </FormControl>
          </Paper>
        </Box>
      )}
    </>
  );
}

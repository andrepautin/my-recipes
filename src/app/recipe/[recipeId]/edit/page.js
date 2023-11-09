"use client";
import { currentUserContext } from "@/app/context/userContext";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useContext, useEffect, useState } from "react";
import {
  FORM_SINGLE_OPTIONS,
  TYPE_OPTIONS,
  MEAL_TYPE_OPTIONS,
  FORM_ARRAY_OPTIONS,
} from "@/app/newrecipe/page";
import { useRouter } from "next/navigation";
import { useHelper } from "@/app/utils/utils";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
import CustomLoading from "@/app/components/customloading";
// add mui styles for edit component
export default function EditRecipe({ params }) {
  const [currentUser, setCurrentUser] = useContext(currentUserContext);
  const [formData, setFormData] = useState({
    name: "",
    ingredients: [""],
    instructions: [""],
    tastes: [""],
    type: [],
    mealType: [],
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

  const { uploadFileAWS } = useHelper();

  const recipeId = params.recipeId;
  useEffect(() => {
    async function getRecipe() {
      const token = getCookie("token");
      const headers = { authorization: "Bearer " + token };
      const response = await axios.get(
        `/api/${currentUser?.id}/recipes/${recipeId}`,
        { headers }
      );
      const { recipe, error } = response.data;
      if (error) {
        console.log("ERROR--->", error);
      } else {
        setFormData({
          name: recipe.name,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          tastes: recipe.tastes,
          type: recipe.type,
          mealType: recipe.mealType,
        });
      }
    }
    getRecipe();
  }, [currentUser, recipeId]);

  const { handleFormChange } = useHelper();
  const router = useRouter();

  const selectFile = (evt) => {
    setFile(evt.target.files[0]);
  };

  // optionAdd, change and remove can me moved to utils

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
    const response = await axios.put(
      `/api/${currentUser?.id}/recipes/${recipeId}`,
      formData,
      { headers }
    );
    setLoading(false);
    const { recipe, error } = response.data;
    if (error) {
      console.log(error);
      // need error handling here with alerts
    }
    if (file && recipe) {
      const imgSrc = await uploadFileAWS(
        recipe?.id,
        currentUser?.id,
        setFile,
        file
      );
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
        <CustomLoading message="Updated Recipe" />
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
                            sx={{ bgcolor: "white", minWidth: "194px", mt: 1 }}
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
                      <Box>
                        <Button
                          variant="contained"
                          name={option}
                          type="button"
                          onClick={handleOptionAdd}
                          sx={{
                            width: "180px",
                            mt: 1,
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
                    </Box>
                  </Grid>
                </Grid>
              ))}
              <Tooltip
                title={
                  currentUser?.userName === "demouser1"
                    ? "This feature is unavailable in demo mode."
                    : "Update your recipe"
                }
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      width: "165px",
                      "&.MuiButtonBase-root": {
                        bgcolor: "#6A9B6B",
                      },
                      "&.MuiButtonBase-root:hover": {
                        bgcolor: "green",
                      },
                      mb: 2,
                      mt: 2,
                    }}
                    disabled={
                      currentUser?.userName === "demouser1" ? true : false
                    }
                  >
                    Update Recipe
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

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
    if (recipe) {
      router.refresh();
      router.push(`/recipe/${recipeId}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {FORM_SINGLE_OPTIONS.map((option) => (
        <div key={option}>
          <label>
            {option[0].toUpperCase() + option.slice(1).toLowerCase()}
          </label>
          {option === "name" ? (
            <input
              className="border-2 border-zinc-950"
              name={option}
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          ) : (
            <select
              className="border-2 border-zinc-950"
              name={option === "type" ? "type" : "mealType"}
              onChange={handleChange}
              required
            >
              {option === "type"
                ? TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))
                : MEAL_TYPE_OPTIONS.map((mt) => (
                    <option key={mt} value={mt}>
                      {mt}
                    </option>
                  ))}
            </select>
          )}
        </div>
      ))}
      {FORM_ARRAY_OPTIONS.map((option) => (
        <div key={option}>
          <label>
            {option[0].toUpperCase() + option.slice(1).toLowerCase()}
          </label>
          <div>
            {formData[option].map((ing, index) => (
              <div key={index}>
                <input
                  className="border-2 border-zinc-950"
                  name={option}
                  type="text"
                  value={formData[option][index]}
                  onChange={(e) => handleOptionChange(e, index)}
                  required
                />
                {formData[option].length > 1 && (
                  <button
                    name={option}
                    onClick={(e) => handleRemoveItem(e, index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <div>
              <button name={option} type="button" onClick={handleOptionAdd}>
                Add {option[0].toUpperCase() + option.slice(1).toLowerCase()}
              </button>
            </div>
          </div>
        </div>
      ))}
      {loading ? (
        <h1>Updating Recipe...</h1>
      ) : (
        <div>
          <button type="submit">Update Recipe</button>
        </div>
      )}
    </form>
  );
}

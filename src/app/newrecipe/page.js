"use client";

import { useContext, useState } from "react";
import { currentUserContext } from "../context/userContext";
import { useHelper } from "../utils/utils";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const FORM_SINGLE_OPTIONS = ["name", "type", "mealType"];

export const TYPE_OPTIONS = ["food", "drink"];

export const MEAL_TYPE_OPTIONS = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "any",
];

export const FORM_ARRAY_OPTIONS = ["ingredients", "instructions", "tastes"];
// add mui components for forms

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
    const response = await axios.post(
      `/api/${currentUser?.id}/recipes`,
      formData,
      { headers }
    );
    setLoading(false);
    const { recipe, error } = response.data;
    console.log("R--->", recipe);
    if (error) {
      console.log(error);
    }
    if (recipe) {
      router.push(`/recipe/${recipe.id}`);
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
        <h1>Adding Recipe...</h1>
      ) : (
        <div>
          <button type="submit">Add Recipe</button>
        </div>
      )}
    </form>
  );
}

const FORM_OPTIONS = [
  "name",
  "ingredients",
  "instructions",
  "tastes",
  "type",
  "mealType",
];

export default function NewRecipe() {
  // name - text
  // ingredients - array of text fields that can be removed, button to add text field
  // instructions - same as ingredients, make sure that it's being added to correct state
  // tastes - same as ingredients and instructions
  // type - dropdown -> food, drink
  // mealType -> bfast, lunch, dinner, snack
  return <h1>New Recipe Form</h1>;
}

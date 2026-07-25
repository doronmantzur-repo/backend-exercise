const recipeModel = require("../models/recipeModel.js");

async function getRecipes(req, res) {
  try {
    console.log("getRecipes");
    const recipes = await recipeModel.getRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send("Error retrieving recipes  " + error.message);
  }
}

async function getRecipeById(req, res) {
  try {
    const recipe = await recipeModel.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).send("Error retrieving recipe");
  }
}

async function addRecipe(req, res) {
  const validation = validateRecipe(req.body);
  if (!validation) {
    return res.status(400).send(validation.message);
  }
  try {
    const newRecipe = await recipeModel.addRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).send("Error adding recipe");
  }
}

async function updateRecipe(req, res) {
  const validation = validateRecipe(req.body);
  if (!validation) {
    return res.status(400).send(validation.message);
  }
  try {
    const updatedRecipe = await recipeModel.updateRecipe(
      req.params.id,
      req.body,
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).send("Error updating recipe");
  }
}

async function deleteRecipe(req, res) {
  try {
    const deletedRecipe = await recipeModel.deleteRecipe(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).send("Recipe not found");
    }
    res.status(200).json(deletedRecipe);
  } catch (error) {
    res.status(500).send("Error deleting recipe");
  }
}

function validateRecipe(recipe) {
  if (!recipe.title || recipe.title.length < 3 || recipe.title.length > 100) {
    return {
      status: false,
      message: "Title must be between 3 and 100 characters",
    };
  }
  if (
    !recipe.description ||
    recipe.description.length < 10 ||
    recipe.description.length > 500
  ) {
    return {
      status: false,
      message: "Description must be between 10 and 500 characters",
    };
  }
  if (!recipe.ingredients || recipe.ingredients.length < 1) {
    return { status: false, message: "Ingredients must be provided" };
  }
  if (!recipe.instructions || recipe.instructions.length < 1) {
    return { status: false, message: "Instructions must be provided" };
  }
  if (!recipe.cookingTime) {
    return { status: false, message: "Cooking time must be provided" };
  }
  if (!recipe.servings || recipe.servings < 0) {
    return { status: false, message: "Servings must be a positive number" };
  }
  if (
    recipe.difficulty.toLowerCase() !== "easy" &&
    recipe.difficulty.toLowerCase() !== "medium" &&
    recipe.difficulty.toLowerCase() !== "hard"
  ) {
    return {
      status: false,
      message: "Difficulty must be 'easy', 'medium', or 'hard'",
    };
  }
  return true;
}

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};

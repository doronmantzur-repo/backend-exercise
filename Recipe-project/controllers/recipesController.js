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
      throw {
        ...new Error("Recipe not found"),
        message: "Recipe not found",
        status: 404,
      };
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
}

async function addRecipe(req, res) {
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

async function getRecipesByQuery(req, res) {
  try {
    // console.log(req.query);
    const queryObj = { ...req.query };
    // console.log(queryObj);
    // console.log(Object.keys(req.query));
    const recipes = await recipeModel.getRecipeByQuery(queryObj);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).send("Error retrieving recipes");
  }
}

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByQuery,
};

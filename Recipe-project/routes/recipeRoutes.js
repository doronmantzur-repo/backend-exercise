const express = require("express");
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByQuery,
} = require("../controllers/recipesController.js");
const logger = require("../middlewares/logger.js");
const recipeValidation = require("../middlewares/recipeValidation.js");
const validateRecipeQuery = require("../middlewares/queryValidation.js");
const {authenticate} = require("../middlewares/authenticate.js");

router.get("/", authenticate, getRecipes);

router.get("/search", validateRecipeQuery, getRecipesByQuery);

router.get("/:id", getRecipeById);

router.post("/",authenticate, recipeValidation, addRecipe);

router.put("/:id", updateRecipe);

router.delete("/:id", deleteRecipe);

module.exports = router;

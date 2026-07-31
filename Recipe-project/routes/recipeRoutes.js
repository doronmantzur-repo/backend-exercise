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

router.get("/search",authenticate, validateRecipeQuery, getRecipesByQuery);

router.get("/:id",authenticate, getRecipeById);

router.post("/",authenticate, recipeValidation, addRecipe);

router.put("/:id",authenticate, updateRecipe);

router.delete("/:id",authenticate, deleteRecipe);

module.exports = router;

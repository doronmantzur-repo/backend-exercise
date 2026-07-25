const fs = require("fs");
const { nanoid } = require("nanoid");

async function getRecipes() {
  const data = await fs.promises.readFile("./data/recipes.json", "utf8");
  return JSON.parse(data);
}

async function getRecipeById(id) {
  const recipes = await getRecipes();
  return recipes.find((recipe) => recipe.id === id);
}

async function addRecipe(newRecipe) {
  const recipes = await getRecipes();
  newRecipe.id = nanoid(7);
  newRecipe.createdAt = new Date().toISOString();
  recipes.push(newRecipe);
  await fs.promises.writeFile(
    "./data/recipes.json",
    JSON.stringify(recipes, null, 2),
  );
  return newRecipe;
}

async function updateRecipe(id, updatedRecipe) {
  const recipes = await getRecipes();
  const index = recipes.findIndex((recipe) => recipe.id === id);
  if (index === -1) {
    return null;
  }
  updatedRecipe.id = id;
  updatedRecipe.createdAt = recipes[index].createdAt;
  recipes[index] = updatedRecipe;
  await fs.promises.writeFile(
    "./data/recipes.json",
    JSON.stringify(recipes, null, 2),
  );
  return recipes[index];
}

async function deleteRecipe(id) {
  const recipes = await getRecipes();
  const index = recipes.findIndex((recipe) => recipe.id === id);
  if (index === -1) {
    return null;
  }
  recipes.splice(index, 1);
  await fs.promises.writeFile(
    "./data/recipes.json",
    JSON.stringify(recipes, null, 2),
  );
  return recipes[index];
}

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
};

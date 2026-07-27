const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

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
  newRecipe.id = uuidv4();
  newRecipe.createdAt = new Date().toISOString();
  recipes.push(newRecipe);
  await writeRecipesToFile(recipes);
  // await fs.promises.writeFile(
  //   "./data/recipes.json",
  //   JSON.stringify(recipes, null, 2),
  // );
  return newRecipe;
}

async function updateRecipe(id, updatedRecipe) {
  const recipes = await getRecipes();
  const index = recipes.findIndex((recipe) => recipe.id === id);
  if (index === -1) {
    const error = new Error("Recipe not found");
    error.status = 404;
    throw error;
  }
  updatedRecipe.id = id;
  updatedRecipe.createdAt = recipes[index].createdAt;
  recipes[index] = updatedRecipe;
  await writeRecipesToFile(recipes);
  return recipes[index];
}

async function deleteRecipe(id) {
  const recipes = await getRecipes();
  const index = recipes.findIndex((recipe) => recipe.id === id);
  if (index === -1) {
    const error = new Error("Recipe not found");
    error.status = 404;
    throw error;
  }
  recipes.splice(index, 1);
  await writeRecipesToFile(recipes);
  return recipes;
}

async function getRecipeByQuery(queryObj) {
  const recipes = await getRecipes();
  let filteredRecipes = recipes;
  for (const key in queryObj) {
    const value = queryObj[key];

    switch (key) {
      case "difficulty":
        console.log("Difficulty:", value);
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.difficulty === value,
        );
        break;

      case "cookingTime":
        const num = Number(value);
        console.log("Max cooking time:", num);
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.cookingTime <= num,
        );
        break;

      case "search":
        console.log("Search term:", value);
        filteredRecipes = filteredRecipes.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(value.toLowerCase()) ||
            recipe.description.toLowerCase().includes(value.toLowerCase()),
        );
        break;

      default:
        console.log("Unknown key:", key);
    }
  }
  return filteredRecipes;
}

async function writeRecipesToFile(recipes) {
  try {
    await fs.promises.writeFile(
      "./data/recipes.json",
      JSON.stringify(recipes, null, 2),
    );
  } catch (err) {
    const error = new Error("Error writing recipes to file" + err.message);
    error.status = 500;
    next(error);
  }
}

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeByQuery,
};

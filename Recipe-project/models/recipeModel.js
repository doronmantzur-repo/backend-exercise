const fs = require("fs");
const { sequelize } = require("../db/models/index.js");
const { v4: uuidv4 } = require("uuid");

async function getRecipes(userId) {
  let query = "SELECT * FROM recipes WHERE user_id = ?";
  const [recipes] = await sequelize.query(query, {
    replacements: [userId],
  });
  // const sqlList =
  //   "(" + results.map((item) => `'${item.recipe_id}'`).join(", ") + ")";
  // query = `SELECT * FROM recipes WHERE id IN ${sqlList}`;
  // const [recipes] = await sequelize.query(query);
  return recipes;
}

async function getRecipeById(id) {
  let query = "SELECT * FROM recipes WHERE id = ?";
  const [recipes] = await sequelize.query(query, {
    replacements: [id],
  });
  return recipes[0];
}

async function addRecipe(newRecipe, userId) {
  const id = uuidv4();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const sql = `
    INSERT INTO recipes (
  id,
  user_id,
  title,
  description,
  ingredients,
  instructions,
  cooking_time,
  servings,
  difficulty,
  image_url,
  is_public,
  created_at,
  updated_at
)
VALUES (
  :id,
  :user_id,
  :title,
  :description,
  :ingredients,
  :instructions,
  :cooking_time,
  :servings,
  :difficulty,
  :image_url,
  :is_public,
  :created_at,
  :updated_at
)
RETURNING *;
  `;
  try {
    const [result, metadata] = await sequelize.query(sql, {
      replacements: {
        id,
        user_id: userId,
        title: newRecipe.title,
        description: newRecipe.description,
        ingredients: `{${newRecipe.ingredients.join(",")}}`,
        instructions: `{${newRecipe.instructions.join(",")}}`,
        cooking_time: newRecipe.cooking_time,
        servings: newRecipe.servings,
        difficulty: newRecipe.difficulty,
        image_url: newRecipe.image_url,
        is_public: newRecipe.is_public ?? true,
        created_at: createdAt,
        updated_at: updatedAt,
      },
    });
    return result[0];
  } catch (error) {
    throw error;
  }
}

async function updateRecipe(id, updatedRecipe, userId) {
  const updatedAt = new Date().toISOString();

  // Convert JS arrays → Postgres varchar[] literals
  const ingredientsLiteral = updatedRecipe.ingredients
    ? `{${updatedRecipe.ingredients.join(",")}}`
    : null;

  const instructionsLiteral = updatedRecipe.instructions
    ? `{${updatedRecipe.instructions.join(",")}}`
    : null;

  const sql = `
    UPDATE recipes
    SET
      title = COALESCE(:title, title),
      description = COALESCE(:description, description),
      ingredients = COALESCE(:ingredients, ingredients),
      instructions = COALESCE(:instructions, instructions),
      cooking_time = COALESCE(:cooking_time, cooking_time),
      servings = COALESCE(:servings, servings),
      difficulty = COALESCE(:difficulty, difficulty),
      image_url = COALESCE(:image_url, image_url),
      is_public = COALESCE(:is_public, is_public),
      updated_at = :updated_at
    WHERE id = :id
    RETURNING *;
  `;

  const [result] = await sequelize.query(sql, {
    replacements: {
      id,
      title: updatedRecipe.title ?? null,
      description: updatedRecipe.description ?? null,
      ingredients: ingredientsLiteral,
      instructions: instructionsLiteral,
      cooking_time: updatedRecipe.cooking_time ?? null,
      servings: updatedRecipe.servings ?? null,
      difficulty: updatedRecipe.difficulty ?? null,
      image_url: updatedRecipe.image_url ?? null,
      is_public: updatedRecipe.is_public ?? null,
      updated_at: updatedAt,
    },
  });

  return result[0];
}

async function deleteRecipe(id, userId) {
  let recipe;

  // Fetch the recipe first
  const selectQuery = `
    SELECT * FROM recipes
    WHERE id = :id AND user_id = :userId
  `;

  try {
    const [rows] = await sequelize.query(selectQuery, {
      replacements: { id, userId },
    });

    recipe = rows[0]; 
    if (!recipe) {
      throw new Error("Recipe not found or does not belong to user");
    }
  } catch (error) {
    throw error;
  }

  const deleteQuery = `
    DELETE FROM recipes
    WHERE id = :id AND user_id = :userId
  `;

  try {
    await sequelize.query(deleteQuery, {
      replacements: { id, userId },
    });
  } catch (error) {
    throw error;
  }

  return recipe; // return the deleted recipe
}


async function getRecipeByQuery(queryObj, userId) {
  const recipes = await getRecipes(userId);
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

      case "cooking_time":
        const num = Number(value);
        console.log("Max cooking time:", num);
        filteredRecipes = filteredRecipes.filter(
          (recipe) => recipe.cooking_time <= num,
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
    throw error;
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

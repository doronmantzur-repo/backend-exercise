const { z } = require("zod");
// in zod by default additional properties are not allowed
// sending additional properties will failed the middleware
const recipeSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  cookingTime: z.number().positive(),
  servings: z.number().positive(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  rating: z.number().min(0).max(5),
}).strict();

module.exports = recipeSchema;

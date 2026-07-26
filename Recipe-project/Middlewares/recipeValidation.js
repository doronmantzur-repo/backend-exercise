const recipeSchema = require("../data/recipeSchema.js");

function recipeValidation(req, res, next) {
  try {
    const result = recipeSchema.safeParse(req.body);
    if (result.success) {
      next();
    } else {
      const error = new Error("Error validating recipe");
      error.status = 400;
      error.message = result.error.issues[0].message;
      next(error);
    }
  } catch (err) {
    const error = new Error("Error validating recipe");
    error.status = 500;
    error.message = err.message;
    next(error);
  }
}

module.exports = recipeValidation;

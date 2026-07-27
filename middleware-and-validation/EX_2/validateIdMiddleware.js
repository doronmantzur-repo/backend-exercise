const express = require("express");
function validateIdMiddleware(req, res, next) {
  const id = req.params.id;
  if (typeof id !== "number") {
    const error = new Error("invalid ID format");
    error.status = 400;
    throw error;
  }
  next();
}
module.exports = validateIdMiddleware;

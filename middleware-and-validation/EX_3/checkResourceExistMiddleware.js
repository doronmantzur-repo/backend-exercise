const express = require("express");
function checkResourceExistMiddleware(req, res, next) {
    // check if array exists
    if (!req.array) {
        const error = new Error("Resource not found");
        error.status = 404;
        throw error;
    }
    next();
}
module.exports = checkResourceExistMiddleware;
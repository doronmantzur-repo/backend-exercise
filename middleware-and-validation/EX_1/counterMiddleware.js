const express = require("express");
let counter = 0
function counterMiddleware(req, res, next) {
    counter++;
    req.requestCount= counter
    next();
  }
  
  module.exports = counterMiddleware;
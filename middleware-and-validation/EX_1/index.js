const express = require("express");
const app = express();
const port = 8080;
const router = express.Router();
const counter = require("./counterMiddleware");
const logger = require("./logger");


app.use(counter);
app.use(logger);
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


router.get("/", (req, res) => {
  res.send(`Welcome! Current request count is ${req.requestCount}`);
});

router.get("/about", (req, res) => {
  res.send(`This is about message! Current request count is ${req.requestCount}`);
});



module.exports = app;
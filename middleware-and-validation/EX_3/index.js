const express = require("express");
const app = express();
const port = 8080;
const router = express.Router();
const validateId = require("./validateIdMiddleware");
const checkResourceExist = require("./checkResourceExistMiddleware");


const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

app.use(express.json());
app.use("/", router);



router.use("/users/:id", validateId, checkResourceExist);

router.get("/users", (req, res) => {
  res.send(JSON.stringify(users, null, 2));
});

router.post("/users", (req, res) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).send(JSON.stringify(newUser, null, 2));
});

router.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  res.send(JSON.stringify(user, null, 2));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: true,
    message: err.message,
    statusCode: err.status || 500,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;

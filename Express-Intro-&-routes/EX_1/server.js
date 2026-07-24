const express = require(`express`);
const app = express();

const port = 3000;
app.get("/", (req, res) => {
  res.send("Server is up and running smoothly");

});

app.listen(port, function () {
  console.log("srver is running on port " + port);
});

module.exports = app;

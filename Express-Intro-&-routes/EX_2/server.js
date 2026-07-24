const express = require(`express`);
const app = express();

const store = [
    { name: "table", inventory: 3, price: 800 },
    { name: "chair", inventory: 16, price: 120 },
    { name: "couch", inventory: 1, price: 1200 },
    { name: "picture frame", inventory: 31, price: 70 }
]

const port = 3000;
app.get("/", (req, res) => {
  res.send("Hi from my server");
});

app.get("/priceCheck/:name", (req, res) => {
  const itemNmae = req.params.name.toLowerCase();
  const item = store.find(item => item.name.toLowerCase() === itemNmae);

  if (!item){
    return res.status(404).send("Item not found");
  }
  res.send({price:item.price})

});

app.listen(port, function () {
  console.log("srver is running on port " + port);
});

module.exports = app;

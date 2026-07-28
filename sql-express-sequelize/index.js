const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT ? process.env.PORT : 8080;
const { sequelize } = require("./db/models/index.js");

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
}
app.get("/", async (req, res) => {
  //   const [results, metadata] = await sequelize.query("SELECT * FROM pokemons");
  //   console.log(results);
  res.send("Hello Express");
});

app.get("/max_pokemon", async (req, res) => {
  let query = "SELECT MAX(weight) FROM pokemons;";
  const [results, metadata] = await sequelize.query(query);
  console.log(results);
  const maxWeight = results[0].max;
  query = `SELECT name FROM pokemons WHERE weight = ${maxWeight}`;
  const [nameResults, nameMetadata] = await sequelize.query(query);
  res.send(nameResults);
});

app.get("/pokemon_by_type/:type", async (req, res) => {
  const type = req.params.type;
  console.log(type);
  let query = `SELECT name FROM pokemons WHERE type = '${type}'`;
  const [results, metadata] = await sequelize.query(query);
  console.log(results);
  res.send(results);
});

app.get("/find_owners/:pokemon", async (req, res) => {
  const pokemon = req.params.pokemon;
  console.log(pokemon);
  let query = `SELECT id FROM pokemons WHERE name = '${pokemon}'`;
  let [results, metadata] = await sequelize.query(query);
  const id = results[0].id;
  query = `SELECT trainer_id FROM pokemon_trainers_pokemons WHERE pokemon_id = ${id}`;
  let [trainers_ids] = await sequelize.query(query);
  const ids = [...new Set(trainers_ids.map((x) => x.trainer_id))];
  const sqlList = `(${ids.join(", ")})`;
  query = `SELECT name
            FROM pokemon_trainers
            WHERE id IN ${sqlList}`;
  let [trainers] = await sequelize.query(query);
  console.log(sqlList);
  console.log(trainers);
  res.send(trainers);
});

app.get("/find_pokemon_by_trainer/:trainer", async (req, res) => {
  const trainer = req.params.trainer;

  let query = `SELECT id FROM pokemon_trainers WHERE name = '${trainer}'`;
  let [results, metadata] = await sequelize.query(query);
  //   console.log(results);
  const id = results[0].id;
  console.log(id);
  query = `SELECT pokemon_id from pokemon_trainers_pokemons WHERE trainer_id = ${id}`;
  let [pokemon_ids] = await sequelize.query(query);
  console.log(pokemon_ids);
  const sqlList = `(${pokemon_ids.map((x) => x.pokemon_id).join(", ")})`;
  //   const ids = [...new Set(trainers_ids.map((x) => x.trainer_id))];
  //   const sqlList = `(${ids.join(", ")})`;
  query = `SELECT name
              FROM pokemons
              WHERE id IN ${sqlList}`;
  let [pockemons] = await sequelize.query(query);
  //   console.log(sqlList);
  console.log(pockemons);
  res.send(pockemons);
});

app.listen(PORT, async () => {
  console.log("Server is listening on port " + PORT);
  await dbConnect();
});

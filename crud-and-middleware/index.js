const express = require("express");
const app = express();
const port = 8080;
const router = express.Router();

app.use(express.json());
app.use("/", router);
//EX_1
router.get("/sanity", (req, res) => {
  res.send("Server is up and running");
});

//EX_2

const wordCounter = {
  apple: 1,
  river: 5,
  sunshine: 2,
  mountain: 5,
  harmony: 4
};


router.get("/words/:word", (req, res) => {
  const { word } = req.params;

  if (wordCounter[word] !== undefined) {
    return res.json({ count: wordCounter[word] });
  }

  return res.json({ count: 0 });
});

//EX_3

router.post("/post/word", (req, res) => {
  const { word } = req.body;
  if (wordCounter[word] === undefined) {
    wordCounter[word] = 1;
  } else {
    wordCounter[word]++;
  }
  res.json({ count: wordCounter[word] });
});


//EX_4

router.post("/post/sentence", (req, res) => {
  const { sentence } = req.body;
  const words = sentence.split(" ");
  let total = 0;
  let numNewWords = 0;
  let numOldWords = 0;
  for (let i = 0; i < words.length; i++) {
    if (wordCounter[words[i]] === undefined) {
      wordCounter[words[i]] = 1;
      numNewWords++;
    } else {
      wordCounter[words[i]]++;
      numOldWords++;
    }
  }
  total = numNewWords + numOldWords;    

  res.json({ text: `Added ${numNewWords} words, ${numOldWords} already existed`, currentCount: total });
});

//EX_5
router.delete("/word/:word", (req, res) => {
  const { word } = req.params;

  if (wordCounter[word] !== undefined) {
    delete wordCounter[word];
    return res.json({ message: `Word '${word}' deleted` });
  }

  return res.status(404).json({ error: "Word not found" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
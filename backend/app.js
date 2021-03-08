const express = require('express');
const app = express();
const port = 5000;

const pool = require("./db")

app.use(express.json())

app.get('/', async (req, res) => {
  res.send("Hello world!!!");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
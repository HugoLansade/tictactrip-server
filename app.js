require("dotenv").config();
require("./src/configs/mongo");
const express = require("express");
const cors = require("cors");
const userModel = require("./src/models/user");

const {
  textJustification,
} = require("./src/controllers/formatter/justification");

const {
  authenticateToken,
  dbCheck,
  generateAccessToken,
} = require("./src/controllers/auth/tokenManagement");

const app = express();

app.use(cors());
app.use(express.text());
app.use(express.json());

app.post("/api/justify", authenticateToken, dbCheck, (req, res) => {
  const response = textJustification(req.body);
  res.send(response);
});

// TOKEN CREATION
app.post("/api/token", async (req, res, next) => {
  // GET USER DATA
  const { email } = req.body;
  const user = { email };
  // 1) Création du token avec données utilisateur
  const token = generateAccessToken(user);
  // 2) Création dans la base de donnée du token utilisateur
  try {
    await userModel.create({
      token,
      email,
      emissionDate: Date.now(),
      nbJustifiedCharacters: 0,
    });
    res.status(201);
  } catch (error) {
    console.log(error);
    next(error);
  }
  res.json({ token });
});

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log(">>>>Server text listening on PORT", process.env.PORT);
});

module.exports = app;

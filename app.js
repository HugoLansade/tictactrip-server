require("dotenv").config();
require("./configs/mongo");
const path = require("path");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const userModel = require("./models/User");

const app = express();

app.use(cors());
app.use(express.text());
app.use(express.json());

// Préfixage des routes
let text = require("./routes/text.js");
app.use("/api/justify", text);

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
      nbJustifiedCharactere: 0,
    });
    res.status(201);
  } catch (error) {
    console.log(error);
    next(error);
  }
  res.json({ token });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN);
}

// DEPLOY FEATURES
app.use(express.static(path.join(__dirname, "public/build")));

app.use("/api/*", (req, res, next) => {
  const error = new Error("Ressource not found.");
  error.status = 404;
  next(error);
});

if (process.env.NODE_ENV === "production") {
  app.use("*", (req, res, next) => {
    // If no routes match, send them the React HTML.
    res.sendFile(path.join(__dirname, "public/build/index.html"));
  });
}

app.listen(process.env.PORT_TEXT, (err) => {
  if (err) console.log(err);
  console.log(">>>>Server text listening on PORT", process.env.PORT_TEXT);
});

module.exports = app;

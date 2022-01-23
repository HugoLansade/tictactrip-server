require("dotenv").config();
const { response } = require("express");
const express = require("express");
const app = express();

const textJustification = require("../Fonctions/justification");
const authenticateToken = require("../controllers/auth/tokenManagement");
const dbCheck = require("../controllers/auth/tokenManagement");

app.post("/", authenticateToken, dbCheck, (req, res) => {
  // TEXT JUSTIFICATION && SEND TO FRONT
  const response = textJustification(req.body);
  res.send(response);
});

module.exports = app;

var express = require('express');
require("dotenv").config();
const cors = require('cors')
const app = express();
require("./configs/mongo");

app.use(cors())
app.use(express.text());

// Préfixage des routes
let text = require("./routes/text.js")
app.use("/api/justify", text);

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

app.listen(process.env.PORT_TEXT, function(err){
    if (err) console.log(err);
    console.log(">>>>Server text listening on PORT", process.env.PORT_TEXT);
});

module.exports = app;


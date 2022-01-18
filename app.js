var express = require('express');
require("dotenv").config();
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());

let text = require("./routes/text.js")
app.use("/api/justify", text);

app.listen(1000)


module.exports = app;


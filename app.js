var express = require('express');
require("dotenv").config();
const cors = require('cors')
const app = express();
require("./configs/mongo");

app.use(cors())
app.use(express.text());

let text = require("./routes/text.js")
// app.use("/api/justify", text);


app.listen(process.env.PORT_TEXT, function(err){
    if (err) console.log(err);
    console.log(">>>>Server text listening on PORT", process.env.PORT_TEXT);
});

module.exports = app;


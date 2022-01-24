const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, // allow to go to the old mongoose version of parser if not working
    useUnifiedTopology: true, // allow to use the MongoDB driver's new connection management engine
  })
  .then(() => console.log("Connected to the DB"))
  .catch((err) => console.error("Error while connecting to DB", err));

const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");

function authenticateToken(req, res, next) {
  // GET TOKEN IN HEADER
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // 1) If doesn't exist => unAuthorized
  if (token == null) return res.sendStatus(401);
  // 2) Check infos ? incorrect => Forbidden : Pass infos
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

async function dbCheck(req, res, next) {
  // GET INFO
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let nbJustifiedCharacters;
  let emissionDate;

  try {
    const resDb = await userModel.findOne({ token });
    nbJustifiedCharacters = resDb.nbJustifiedCharacters;
    emissionDate = resDb.emissionDate;
  } catch (error) {
    console.log(error);
    next(error);
  }

  //VERIFY INFO
  const wasCreated = Date.now() - emissionDate;
  // Number of milisecond in 24h
  const oneDay = 8.64 * Math.pow(10, 7);
  const charsLimit = 80000;
  const currentCharsJustified = req.body.length;

  //1) If he didnt outpass the word limit we increment
  if (nbJustifiedCharacters < charsLimit) {
    nbJustifiedCharacters += currentCharsJustified;
  }
  //2) If 24 hours have passed and the user made request that globaly contains less than 80000 characters
  // We reinitialize the date
  if (wasCreated > oneDay && nbJustifiedCharacters < charsLimit) {
    emissionDate = Date.now();
    wasCreated = 0;
  }
  //3) Check if we have less than the wordLimit in 24h
  if (wasCreated < oneDay && nbJustifiedCharacters >= charsLimit)
    return res.sendStatus(402);

  // UPDATE INFO IN DB
  try {
    await userModel.findOneAndUpdate(
      { token },
      { nbJustifiedCharacters, emissionDate },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
  next();
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN);
}

module.exports = { authenticateToken, dbCheck, generateAccessToken };

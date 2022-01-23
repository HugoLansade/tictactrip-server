const jwt = require("jsonwebtoken");
const userModel = require("../../models/User");

module.exports = function authenticateToken(req, res, next) {
  // GET TOKEN IN HEADER
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // 1) Si il n'existe pas => unAuthorized
  if (token == null) return res.sendStatus(401);
  // 2) Check infos ? incorrect => Forbidden : Passes infos
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = async function dbCheck(req, res, next) {
  // GET INFO
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    const resDb = await userModel.findOne({ token: token });
    var nbJustifiedCharactere = resDb.nbJustifiedCharactere;
    var emissionDate = resDb.emissionDate;
  } catch (error) {
    console.log(error);
    next(error);
  }

  //VERIFY INFO
  const wasCreated = Date.now() - emissionDate;
  const oneDay = 8.64 * Math.pow(10, 7);
  const wordsLimit = 80000;
  const currentWordsJustified = req.body.length;

  //1) Si il est en dessous de la limite de mot on incremente
  if (nbJustifiedCharactere < wordsLimit) {
    nbJustifiedCharactere += currentWordsJustified;
  }
  //2) Check si on a moins de la limite de mot en 24h
  if (wasCreated < oneDay && nbJustifiedCharactere >= wordsLimit)
    return res.sendStatus(402);

  // UPDATE INFO IN DB
  try {
    await userModel.findOneAndUpdate(
      { token },
      { nbJustifiedCharactere },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
  next();
};

require('dotenv').config()
require("./configs/mongo");
const express = require("express")
const app = express();
const jwt = require("jsonwebtoken")
const cors = require('cors');
const userModel = require('./models/User');
app.use(cors())
app.use(express.json())  

app.post('/api/token', async (req, res) => {
    const email = req.body.email
    const user = {email : email}

    const accessToken = generateAccessToken(user)

    try {
        await userModel.create({ token : accessToken, email : email, emissionDate : Date.now(), nbJustifiedCharactere :  0});
        res.status(201);
    } catch (error) {
        console.log(error)
        next(error);
    }
    res.json({accessToken : accessToken})
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN) //, {expiresIn : '30s'}
}

app.listen(process.env.PORT_AUTH, function(err){
    if (err) console.log(err);
    console.log(">>>>Server authentification listening on PORT", process.env.PORT_AUTH);
});


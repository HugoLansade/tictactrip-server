require('dotenv').config()
const express = require("express")
const app = express();
const jwt = require("jsonwebtoken")
const cors = require('cors');
const userModel = require('./models/User');
app.use(cors())
app.use(express.json())  

// app.post('/api/token', async (req, res) => {
//     const email = req.body.email
//     // const loginDate = Date.now();
//     // const wordsJustified = 0;
//     // console.log("body", req.body)

//     // console.log("login email", email)
//     // console.log("date", loginDate)

//     // const user = {email : email, date : loginDate, nbCharacterUsed : wordsJustified }
//     const user = {email : email}

//     const accessToken = generateAccessToken(user)

//     try {
//         await userModel.create({ token : accessToken, email : email, emissionDate : Date.now(), nbJustifiedCharactere :  0});
//         res.status(201);
//     } catch (error) {
//         console.log(error)
//         next(error);
//     }
//     // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN)
//     // refreshTokens.push(refreshToken) // ici on devrait stocker dans une base de donnée
//     res.json({accessToken : accessToken}) //, refreshToken : refreshToken
// })

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN) //, {expiresIn : '30s'}
}

app.listen(process.env.PORT_AUTH, function(err){
    if (err) console.log(err);
    console.log(">>>>Server authentification listening on PORT", process.env.PORT_AUTH);
});


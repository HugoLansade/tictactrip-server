require('dotenv').config()
const express = require("express")
const app = express();
const jwt = require("jsonwebtoken")
const cors = require('cors')
app.use(cors())
app.use(express.json())  



let refreshTokens = []

app.post('/api/token', (req, res) => {
    const email = req.body.email
    const loginDate = Date.now();
    const wordsJustified = 0;
    console.log("body", req.body)

    console.log("login email", email)
    console.log("date", loginDate)

    const user = {email : email, date : loginDate, wordsJustified : wordsJustified }
    const accessToken = generateAcessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN)
    refreshTokens.push(refreshToken) // ici on devrait stocker dans une base de donnée
    res.json({accessToken : accessToken, refreshToken : refreshToken})
})

function generateAcessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN) //, {expiresIn : '30s'}
}

app.listen(process.env.PORT_AUTH, function(err){
    if (err) console.log(err);
    console.log(">>>>Server authentification listening on PORT", process.env.PORT_AUTH);
});

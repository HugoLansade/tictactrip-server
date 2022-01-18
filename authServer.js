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
    console.log("body", req.body)

    console.log("login email", email)
    const user = {email : email}
    const accessToken = generateAcessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN)
    refreshTokens.push(refreshToken) // ici on devrait stocker dans une base de donnée
    res.json({accessToken : accessToken, refreshToken : refreshToken})
})

function generateAcessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn : '30s'})
}

app.listen(2000)

require('dotenv').config()
const express = require("express")
const app = express();
const jwt = require("jsonwebtoken")


app.post("/", authenticateToken, (req, res) => {
    console.log("req.body",req.body)
    const response = {... req.body, textJustified : "Im the text justified"}
    console.log("response",response)    
    res.json(response)
})

  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

module.exports = app;
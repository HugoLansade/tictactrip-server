require('dotenv').config()
const { response } = require('express');
const express = require("express")
const app = express();
const jwt = require("jsonwebtoken");
// const { textJustification } = require('../Fonctions/justification');


app.post("/", authenticateToken, (req, res) => {
    console.log("req.body",req.body)
    const response1 = textJustification(req.body)
    // const response = response1 
    // console.log("response1---------------------------------------------")

    // console.log(response1)
    // console.log("response---------------------------------------------")

    // console.log(response)
    // console.log("end---------------------------------------------")

    res.send(response1)
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

  // function textJustification(inputText){
  //   // Objectif : Avoir maximum 80 caractère par ligne
  //   // Bonus : Ne pas couper les mots, à la place rajouter des espaces
  //   let outputText = "";
  //   let wordPerLign = 80;
  //   for (let i = 0; i < inputText.length; i++) {
  //     if(i%wordPerLign === 0){
  //       outputText[i] ="\n"
  //       outputText[i+1] = inputText[i]
  //       i++;
  //     } else {
  //       outputText[i] = inputText[i]
  //     }
      
  //   }
  // }


  
  function textJustification (initialText){
    let newTxt = initialText;                                               
    let newPieceOftext = [];                                            //Array contenant les lignes

    while(newTxt.length > 80){    // Tant que notre texte est plus grand que 80 caractére on exécute la fonction                                  
      let body = spliceText(newTxt) 
      newTxt = body.nexTxt;
      newPieceOftext.push(body.pieceOfText + "\n"); // On récupère la ligne traitée et on lui ajoute un retour à la ligne
    }
    newPieceOfText = addSpace2(newPieceOftext);

    let lastPieceOfText = newTxt.slice(0, newTxt.length)// on ne prend pas en compte le cas si le text fini pile poile à 80
    
    newPieceOfText.push(lastPieceOfText)
    let finalString = newPieceOfText.reduce((acc, val) => acc+=val)
    
    console.log("finalString")
    console.log(finalString)
    return finalString
 }
  
  function spliceText(txt){
    // console.log("Im splacing")
    let pieceOfText = "";
    let nexTxt ="";
    if(txt[80] === " "){
      pieceOfText = txt.slice(0,80);
      nexTxt = txt.replace(pieceOfText,"");
    } else { 
      let letterBefore = countLetterBefore(80,txt);
      pieceOfText = txt.slice(0, 80-letterBefore);
      nexTxt = txt.replace(pieceOfText,"");    
    }
    return {pieceOfText,  nexTxt}
  
  }

  
   function countLetterBefore(index,text){
     let count =0;
     while(text[index] !== " "){
       index --;
       count ++;
     }
     return count;
   }
  
  
  // V3 Add space
  
  function addSpace(piecesOfText){  
    let spaceText = piecesOfText.map((pieceOfText) => {
      let missingSpaces = 81 - pieceOfText.length
      if(missingSpaces){
        //On divise direct le text en 8 pour avoir 3 espaces
        //Ca n'est pas parfait car on aura souvent plus de trou à l'arriere qu'a l'avant
        let space = 80/8; //8 au hasard 
        // on a donc 8 zones d'insertion on ne compte pas les extrémités
        // on fait txt[8] et la si on atterit pas sur un mot on regarde l'espace le plus proche 
        for(let i = 1 ; i < 8 ; i++){
            pieceOfText[space*i]
  
        }
        
        while(missingSpaces){
          pieceOfText = pieceOfText.replace(" ", "  ") //on remplace un espace par 2 => on ajoute un seul espace
              // console.log(pieceOfText)
          
  
          missingSpaces --
        }      
      }
      return pieceOfText
    })
      console.log("exit")
    
      console.log(spaceText)
    
  }
  
   function countLetterAfter(index,text){
     let count =0;
     while(text[index] !== " "){
       index ++;
       count ++;
     }
     return count;
   }
  // let str2 = "la la la"
  // let str3 = str2.replace("la","el")
  // console.log(str3)
  
  function test (text, letterPerLign, nbSpace){
    let numberOfSpace = letterPerLign/nbSpace;
    
  }
  
  function addSpace2 (piecesOfText) {
    let spaceText = piecesOfText.map((pieceOfText) => {
      let missingSpaces = 81 - pieceOfText.length    
      let arrText = pieceOfText.split(' ')
      let nbWords = arrText.length;
      while(missingSpaces){
       let spacePosition = Math.floor(Math.random() * (nbWords-1 - 2) + 2) //on détermine la position où l'on met un espace le min =1 pour éviter de mettre un espace premiere position max = mots-1 pour meme raison en fin PEUT ETRE QU4IL FAUT METTRE 2 !!!!!!!!!!!!!!!!!!!!!!!!!!!
       arrText.splice(spacePosition,0," ")
        missingSpaces--
      }
      // Maintenant on remet les espaces initiaux
      arrText = arrText.map((mot) => {
        //apres chaque mot qui n'est pas un espace je met un espace
        if(mot !=="" && mot !==" "){        
          mot = mot + " ";
          
        }
          // console.log(mot)
        
        return mot
      })
      // return arrText;
       // console.log(arrText)
      
       let temp = arrText.reduce((acc, val) => acc += val)
       // console.log("temp")
       // console.log(temp)
      
       return temp
    })
    // console.log(spaceText)
    return spaceText;
  }

module.exports = app;
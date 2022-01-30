// Global function in wich we go through the text as a string and slice it in pieces of 80
// We make an assembly of all pieces at the end
function textJustification(initialText) {
  let newTxt = initialText;
  let newPieceOftext = []; //Array containing each lign of 80
  let charByLign = 80;

  // While our text is bigger than chars limit we continue looping
  while (newTxt.length > charByLign) {
    let body = spliceText(newTxt, charByLign); // return an object containing a pieceOfText with a max size of 80 and the text to which we removed the pieceOfText
    newTxt = body.nexTxt; // Update the text with the new one
    newPieceOftext.push(body.pieceOfText + "\n"); // We group all pieceOfText in an array, this array separate the pieces with a line break
  }
  newPieceOfText = addSpace2(newPieceOftext, charByLign); // return an array with pieces of txt and the exact number of space require to make a lign of 80 chars

  let lastPieceOfText = newTxt.slice(0, newTxt.length); // The last piece of text is under 80 or equal so we dont want to justify it, that is why we push it after adding space

  newPieceOfText.push(lastPieceOfText); // Regroup all pieces
  let finalString = newPieceOfText.reduce((acc, val) => (acc += val)); // Joining all pieces together as a single string

  return finalString;
}

function spliceText(txt, charByLign) {
  let pieceOfText = "";
  let nexTxt = "";
  if (txt[charByLign - 1] === " ") {
    // If the last char is a space we take the all lign
    pieceOfText = txt.slice(0, charByLign);
    // We remove from the text the lign containing the piece of text
    nexTxt = txt.replace(pieceOfText, "");
  } else {
    // If the 80 char is in a word we look for the start of the word and then slice before this word
    let letterBefore = countLetterBefore(charByLign, txt); // return an index of where we can slice
    pieceOfText = txt.slice(0, charByLign - letterBefore);
    nexTxt = txt.replace(pieceOfText, "");
  }
  return { pieceOfText, nexTxt };
}

// Find the start of a word and return its index
function countLetterBefore(index, text) {
  let count = 0;
  while (text[index] !== " ") {
    index--;
    count++;
  }
  return count;
}

function addSpace2(piecesOfText, charByLign) {
  // we go through the all tab containing pieces of text that need to have space to reach 80 chars
  console.log("inn");
  let spaceText = piecesOfText.map((pieceOfText) => {
    let missingSpaces = charByLign + 1 - pieceOfText.length; // calculation of missing spaces
    let arrText = pieceOfText.split(" "); //remove the initial space to be able to add space at correct index
    let nbWords = arrText.length;
    while (missingSpaces) {
      // We asign a random position (yes it can be x time the same for now but i'm still working on it)
      let spacePosition = Math.floor(Math.random() * (nbWords - 2) + 2);
      arrText.splice(spacePosition, 0, " "); //adding space
      missingSpaces--;
    }
    // We add the initial space
    arrText = arrText.map((mot) => {
      // After each word that is not a space I add a space
      if (mot !== "" && mot !== " ") {
        mot = mot + " ";
      }
      return mot;
    });

    return arrText.reduce((acc, val) => (acc += val)); // we make an ssembly of each word to create and return a string lign of 80Z
  });
  return spaceText;
}

module.exports = {
  textJustification,
  countLetterBefore,
  spliceText,
  addSpace2,
};

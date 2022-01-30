const {
  countLetterBefore,
  spliceText,
  addSpace2,
} = require("../src/controllers/formatter/justification.js");

// We want that lines contains less than 80 characters
test("Have 80 or less character on the output", () => {
  const text =
    "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.»";
  const charByLign = 80;
  expect(spliceText(text, charByLign).pieceOfText.length).toBeLessThanOrEqual(
    80
  );
});

// Should remove +1 ligne 55 and add -1 lign 58
test("Each lines should have 80 chars at the end", () => {
  const piecesOfText = [
    "mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je",
  ];
  const charByLign = 80;
  expect(addSpace2(piecesOfText, charByLign)[0].length).toEqual(80);
});

// We want to count number of chars from an index to the begining of the word
test("Give number of character before the start of the word", () => {
  const text = "hello world";
  const index = 7;
  expect(countLetterBefore(index, text)).toBe(2);
});

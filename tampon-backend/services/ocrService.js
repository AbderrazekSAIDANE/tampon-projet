const Tesseract = require("tesseract.js");
const path = require("path");

const runOCR = async (imagePath) => {
  try {
    const result = await Tesseract.recognize(
      imagePath,
      "fra+eng+ara", // ou "eng" si tu veux l'anglais
      {
        logger: (m) => console.log(m), // Pour voir la progression
      }
    );

    return result.data.text;
  } catch (error) {
    console.error("Erreur OCR :", error);
    throw error;
  }
};

module.exports = { runOCR };

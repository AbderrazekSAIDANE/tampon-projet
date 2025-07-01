// controllers/uploadController.js
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { createWorker } = require("tesseract.js");

const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// 1. Amélioration de l'image
async function enhanceImage(inputPath) {
  const outputPath = inputPath.replace(/(\.\w+)$/, "_enhanced$1");
  await sharp(inputPath)
    .resize({ width: 1600, withoutEnlargement: false })
    .sharpen()
    .grayscale()
    .normalize()
    .toFile(outputPath);
  return outputPath;
}

// 2. OCR multilingue (fra + eng + ara)
async function runOCR(filePath) {
  const worker = await createWorker();
  await worker.loadLanguage("fra+eng+ara");
  await worker.initialize("fra+eng+ara");
  const { data } = await worker.recognize(filePath);
  await worker.terminate();
  return data.text;
}

// 3. Extraction multilingue
function extractFields(text) {
  const get = (regex) => (text.match(regex) || [])[1]?.trim() || "";

  return {
    raisonSociale:
      get(/(?:Raison\s+sociale|Société|Company|الشركة)\s*[:\-]?\s*(.+)/i),
    nomPrenom:
      get(/(?:Nom.*pr(?:é|e)nom|Name|الاسم)\s*[:\-]?\s*(.+)/i),
    adresse:
      get(/(?:Adresse|Address|العنوان)\s*[:\-]?\s*([\s\S]+?)(?:SIRET|SIREN|RCS|$)/i),
    siret:
      get(/\bSIRET\s*[:\-]?\s*(\d{14})\b/i),
    siren:
      get(/\bSIREN\s*[:\-]?\s*(\d{9})\b/i),
    rcs:
      get(/\bR\.?C\.?S\.?\s*[:\-]?\s*([\w\s\d\-\/]+)\b/i),
    activites:
      get(/(?:Activit[eé]s?|Objet\s+social|Business\s+activity|النشاط)\s*[:\-]?\s*([\s\S]+?)(?:SIRET|SIREN|RCS|$)/i),
  };
}

// 4. Contrôleur principal
exports.uploadFiles = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Aucun fichier envoyé." });
    }

    const fileField = req.files.pieceIdentite || req.files.file;
    if (!fileField) {
      return res.status(400).json({ message: "Champ fichier manquant." });
    }

    const uniqueName = `${uuidv4()}_${fileField.name.replace(/\s+/g, "_")}`;
    const savePath = path.join(UPLOAD_DIR, uniqueName);
    await fileField.mv(savePath);

    const enhancedPath = await enhanceImage(savePath);
    const rawText = await runOCR(enhancedPath);
    const fields = extractFields(rawText);

    fs.unlink(savePath, () => {});
    fs.unlink(enhancedPath, () => {});

    return res.status(200).json({
      success: true,
      textBrut: rawText,
      champs: fields,
    });
  } catch (err) {
    console.error("Erreur upload/OCR :", err);
    return res.status(500).json({
      success: false,
      message: "Erreur lors du traitement OCR.",
      error: err.message,
    });
  }
};

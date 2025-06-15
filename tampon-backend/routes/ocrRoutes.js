const express = require('express');
const router = express.Router();
const { createWorker } = require('tesseract.js');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-poppler');

router.post('/ocr', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "Aucun fichier n'a été envoyé." });
    }

    const uploadedFile = req.files.file;
    const uploadPath = path.join(__dirname, '..', 'uploads', uploadedFile.name);

    // Sauvegarde temporaire du fichier
    await uploadedFile.mv(uploadPath);
    console.log(`Fichier sauvegardé à : ${uploadPath}`);

    let imagePath;

    if (uploadedFile.mimetype === 'application/pdf') {
      const outputDir = path.join(__dirname, '..', 'uploads');
      const outputPrefix = 'converted';
      const outputImagePath = path.join(outputDir, `${outputPrefix}-1.png`);

      // Options pour pdf-poppler
      const opts = {
        format: 'png',
        out_dir: outputDir,
        out_prefix: outputPrefix,
        page: 1
      };

      console.log("Conversion du PDF en image...");
      await pdf.convert(uploadPath, opts);

      imagePath = outputImagePath;
      console.log(`PDF converti en image à : ${imagePath}`);
    } else {
      imagePath = uploadPath;
    }

    // Vérifiez si l'image existe avant de continuer
    if (!fs.existsSync(imagePath)) {
      throw new Error(`L'image convertie n'existe pas à : ${imagePath}`);
    }

    // Initialiser le worker Tesseract
    const worker = await createWorker({
      logger: m => console.log(m),
    });

    // Charger les langues nécessaires
    await worker.loadLanguage('fra+eng+ara');
    await worker.initialize('fra+eng+ara');

    // Effectuer l'OCR sur l'image
    console.log("Début de l'OCR...");
    const { data } = await worker.recognize(imagePath);
    console.log("OCR terminé.");

    // Terminer le worker
    await worker.terminate();

    // Supprimer les fichiers temporaires
    fs.unlinkSync(uploadPath);
    if (uploadedFile.mimetype === 'application/pdf') {
      fs.unlinkSync(imagePath);
    }

    res.json({ text: data.text || "Aucun texte trouvé." });
  } catch (err) {
    console.error("Erreur OCR :", err);
    res.status(500).json({ error: "Erreur OCR", details: err.message });
  }
});

module.exports = router;

// controllers/uploadController.js
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();



const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.uploadFiles = async (req, res) => {
console.log("Fichiers reçus:", req.files);
console.log("Nom dans le champ pieceIdentite:", req.files?.pieceIdentite?.name);
console.log("Nom dans le champ registreCommerce:", req.files?.registreCommerce?.name);

  try {
    if (!req.files || !req.files.pieceIdentite || !req.files.registreCommerce) {
      return res.status(400).json({ message: 'Les deux fichiers sont requis.' });
    }

    const uploadToS3 = (file, folder) => {
      const fileName = `${folder}/${uuidv4()}_${file.name}`;
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: file.data,
        ContentType: file.mimetype,
      };

      return s3.upload(params).promise();
    };

    const pieceIdentite = await uploadToS3(req.files.pieceIdentite, 'piece-identite');
    const registreCommerce = await uploadToS3(req.files.registreCommerce, 'registre-commerce');

    res.status(200).json({
      pieceIdentiteUrl: pieceIdentite.Location,
      registreCommerceUrl: registreCommerce.Location,
    });
  } catch (error) {
    console.error("Erreur lors de l'upload :", error);
    res.status(500).json({ message: 'Erreur lors de l\'upload', error: error.message });
  }
};
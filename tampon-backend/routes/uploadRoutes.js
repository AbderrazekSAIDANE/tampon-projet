// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');

router.post('/upload', uploadController.uploadFiles);

module.exports = router;
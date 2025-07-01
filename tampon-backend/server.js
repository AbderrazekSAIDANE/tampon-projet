require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const uploadRoutes = require('./routes/uploadRoutes');
const fileUpload = require('express-fileupload');
const ocrRoutes = require('./routes/ocrRoutes'); // 👈 ajouté ici
const expressFileUpload = require("express-fileupload");

dotenv.config();
connectDB();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());

// 🔗 Routes
app.use('/api/orders', require('./routes/orders'));
app.use('/api', uploadRoutes);
app.use('/api', ocrRoutes); // 👈 ajout de la route OCR

app.use(expressFileUpload({ useTempFiles: false }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  categorie: String,
  taille: String,
  texteHaut: String,
  texteMilieu: String,
  texteBas: String,
  police: String,
  taillePolice: Number,
  zoom: Number,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

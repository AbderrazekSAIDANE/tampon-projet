const Order = require('../models/Order');

// Ajouter une commande
exports.addOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Erreur lors de la création de la commande :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer toutes les commandes
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

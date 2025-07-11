const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.addOrder);
router.get('/', orderController.getOrders);

module.exports = router;

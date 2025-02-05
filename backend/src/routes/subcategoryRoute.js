const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

// Routes for subcategories
router.post('/create', subcategoryController.createSubcategory);
router.get('/', subcategoryController.getAllSubcategories);

module.exports = router;

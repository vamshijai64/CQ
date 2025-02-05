const CategeoryModel = require('../models/CategeoryModel');
const subcategoryService = require('../services/subcategoryService');

exports.createSubcategory = async (req, res) => {
  try {
    const { name,imageUrl ,category } = req.body;
    const subcategory = await subcategoryService.createSubcategory(name,imageUrl, category);
    res.status(201).json({ message: 'Subcategory created successfully', subcategory });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Error creating subcategory', error: error.message });
  }
};

exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await subcategoryService.getAllSubcategories();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategories', error: error.message });
  }
};
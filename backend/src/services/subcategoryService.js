

const CategeoryModel = require('../models/CategeoryModel');
const subcategoryModel = require('../models/subcategoryModel');

exports.createSubcategory = async (name, imageUrl,category) => {

  try {
    // Ensure the category is a valid ObjectId
    const categoryDoc = await CategeoryModel.findById(category);
    if (!categoryDoc) {
      throw new Error('Category not found');
    }

    const subcategory = new subcategoryModel({ name, imageUrl, category: categoryDoc._id });
    return await subcategory.save();
  } catch (error) {
    throw new Error('Error creating subcategory: ' + error.message);
  }
};

exports.getAllSubcategories = async () => {
  try {
    return await subcategoryModel.find().populate('category').populate('quizzes');
  } catch (error) {
    throw new Error('Error fetching subcategories: ' + error.message);
  }
};
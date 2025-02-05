
const CategeoryModel = require('../models/CategeoryModel');
const categoryModel=require('../models/CategeoryModel')  

exports.createCategory=async(name,imageUrl)=>{

    try{
        
        const category=new categoryModel({name,imageUrl})

        return await category.save();
        
    }  catch(error){
        throw new Error(error)
    }   

}

exports.getAllCategories = async () => {
    try {
      return await CategeoryModel.find().populate('subcategories');
    } catch (error) {
      throw new Error('Error fetching categories: ' + error.message);
    }
  };


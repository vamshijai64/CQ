
const CategeoryModel = require('../models/CategeoryModel');
const path = require("path");
const fs = require("fs");



exports.createCategory=async(name,imageFile,imageUrl)=>{

    try{
      if (!name) {
        throw new Error('Category name is required');
    }
        //  Check if category already exists (case-insensitive)
        const existingCategory = await CategeoryModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

        if (existingCategory) {
          throw new Error('Category with this name already exists');
      }
      // const imageUrl=imageFile ? `/uploads/${imageFile.filename}`:null
        
      //   const category=new CategeoryModel({name,imageUrl})
        // 🔹 Determine image URL
        let finalImageUrl = null;
        if (imageFile) {
            finalImageUrl = `/uploads/${imageFile.filename}`; // Local file
        } else if (imageUrl) {
            finalImageUrl = imageUrl; // External URL
        }

        // 🔹 Create new category
        const category = new CategeoryModel({ name, imageUrl: finalImageUrl });

        return await category.save();
        
    }  catch(error){
        throw new Error(error.message)
    }   

}

exports.getAllCategories = async () => {
    try {
      return await CategeoryModel.find().populate('subcategories');
    } catch (error) {
      throw new Error('Error fetching categories: ' + error.message);
    }
  };

  // exports.getCategoryById=async(id)=>{
  // return await CategeoryModel.findById(id).populate("subcategories")
  // }

  exports.getCategoryById = async (id) => {
    try {
      return await CategeoryModel.findById(id).populate("subcategories");
    } catch (error) {
      console.error("Database error while fetching category:", error);
      throw new Error("Database error: " + error.message); // ✅ Ensures error is caught in controller
    }
  };
  

exports.getCategorieyByName=async(name)=>{
    try {
      return await CategeoryModel.findOne({
        name: { $regex: new RegExp(name, "i") } // Case-insensitive search
      }).populate('subcategories');
    } catch (error) {
      throw new Error("Error fetching category by name: " + error.message);
    }
  }
  
//upadte category

exports.updateCategory =async (categoryId, name, imageFile,imageUrl)=>{
  try{
  const category=await CategeoryModel.findById(categoryId);
  if(!category) throw new Error('Categroy not found')
      // Update name if provided
  if (name) {
    category.name = name;
  }

    // if(imageFile){
    //   //delete old image if exists
    //   if(category.imageUrl){
    //     const oldimagePath=path.join(__dirname,'..',category.imageUrl);
    //     if (fs.existsSync(oldimagePath)) {
    //       fs.unlinkSync(oldimagePath);
    //   }
      
    // }
    // category.imageUrl = `/uploads/${imageFile.filename}`;
    //  //category.name = name || category.name;
    // }

    if (imageFile) {
      // Delete old local image if exists
      if (category.imageUrl && !category.imageUrl.startsWith('http')) {
          const oldImagePath = path.join(__dirname, '..', category.imageUrl);
          if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath); // Delete previous image
          }
      }
      category.imageUrl = `/uploads/${imageFile.filename}`;
  } else if (imageUrl) {
      // If user provided an external image URL, update the field
      category.imageUrl = imageUrl;
  }
      return await category.save();

} catch(error){
  throw new Error(error.message);

}
}


exports.deleteCategory = async (categoryId) => {
  try {
      const category = await CategeoryModel.findById(categoryId);
      if (!category) throw new Error("Category not found");

      // Delete image from storage
      if (category.imageUrl) {
          const imagePath = path.join(__dirname, '..', category.imageUrl);
          if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
          }
      }

      await CategeoryModel.findByIdAndDelete(categoryId);
  } catch (error) {
      throw new Error(error.message);
  }
};




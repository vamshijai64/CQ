// models/Subcategory.js
const mongoose = require('mongoose');


const subcategorySchema = new mongoose.Schema({
  
  name: { type: String, required: true },

  imageUrl:{type:String,required:true},

  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true },
  quizzes: 
  [
    { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Quiz' 
  }
]
}, { timestamps: true });



module.exports = mongoose.model('Subcategory', subcategorySchema);

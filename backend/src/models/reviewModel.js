const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    // _id: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    imageUrl:{ type:String,required:true },
  
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Review', reviewSchema);
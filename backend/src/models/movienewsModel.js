const mongoose=require('mongoose');

const movienewsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{    
        type:String,    
        required:true,
    },
    imageUrl:{type:String,required:true},
   
},
{
    timestamps: true, // ✅ This adds both `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Movienews', movienewsSchema);


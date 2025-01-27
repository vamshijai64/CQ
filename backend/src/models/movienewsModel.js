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
    //source:{type:String,required:true},
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Movienews', movienewsSchema);


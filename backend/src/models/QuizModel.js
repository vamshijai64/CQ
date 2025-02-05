const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  subcategory: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subcategory', 
    required: true 
  },
  // category: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Category', 
  //   required: true 
  // },

  questions: [
    {
      question: { 
        type: String, 
        required: true 
      },
      options: [
        {
          id: { type: String, required: true },  // ✅ Corrected
          name: { type: String, required: true }
        }
      ],
      correctOption: { 
        id: { type: String, required: true },  // ✅ Corrected
        name: { type: String, required: true } 
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);





// //..........number type...........//
// // models/Quiz.js
// const mongoose = require('mongoose');

// const quizSchema = new mongoose.Schema({
//   title: { 
//     type: String, 
//     required: true },

//   subcategory: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Subcategory', 
//     required: true },
//   questions: [
//     {
//       question: { 
//         type: String, 
//         required: true
//        },
//       options:
//        [
//         { 
//           type: String,
//           required: true
//          }
//         ],
//       correctOption:
//       { 
//         type: Number, required: true }
//     },
//   ]
// }, { timestamps: true });

// module.exports = mongoose.model('Quiz', quizSchema);
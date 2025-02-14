const QuizModel = require("../models/QuizModel");
const mongoose = require("mongoose");



const subcategoryModel = require("../models/subcategoryModel");

exports.createQuiz = async (title, subcategory,category, questions) => {
  try {
    const subcategoryDoc = await subcategoryModel.findById(subcategory);
    if (!subcategoryDoc) {
      throw new Error('Subcategory not found');
    }
    
    for(const questionObj of questions){
      const existingQuiz= await QuizModel.findOne({
        subcategory,
        'questions.question':questionObj.question
      })

      if(existingQuiz){
        throw new Error(`Duplicate question found :${questionObj.question}`);
      }
         // Remove the _id field from each option in the question
        //  questionObj.options = questionObj.options.map(option => {
        //   const { _id, ...rest } = option;  // Remove the _id field
        //   return rest; // Return the option without _id
        // });
      }

    const quiz = new QuizModel({ title, subcategory: subcategoryDoc._id, category, questions });
    const savedQuiz= await quiz.save();


    subcategoryDoc.quizzes.push(savedQuiz._id);
    await subcategoryDoc.save();

    return savedQuiz;

  } catch (error) {
    throw new Error('Error creating quiz:' + error.message);
  }
};

exports.getQuizzesBySubcategory = async (subcategoryId) => {
  try {
    return await QuizModel.find({ subcategory: subcategoryId });
  } catch (error) {
    throw new Error('Error fetching quizzes: ' + error.message);
  }
};

// exports.getQuizzesBySubcategory = async (subcategoryId) => {
//   const quizzes = await QuizModel.find({ subcategory: subcategoryId });

//   //  Limit questions to 9 per quiz
//   return quizzes.map(quiz => ({
//       ...quiz._doc,
//       questions: quiz.questions.slice(0, 9) // ✅ Only take the first 9 questions
//   }))
// };

exports.getAllQuizzes = async () => {
  try {
    const quizzes= await QuizModel.find()
      .populate('subcategory') // Populate the subcategory field with its details
      .populate({
        path: 'subcategory',
        populate: { path: 'category' } // Populate category inside subcategory
      });

      quizzes.forEach(quiz => {
        quiz.questions.forEach(question => {
          // Match the correct option based on the correctOption id
          const correctOption = question.options.find(option => option.id === question.correctOption.id);
          if (correctOption) {
            question.correctOption = correctOption; // Update correctOption field to match the option object
          }
        });
      });
      return quizzes;

      
  } catch (error) {
    throw new Error('Error fetching quizzes: ' + error.message);
  }
};



exports.getRandomQuestionsBySubcategory = async (subcategoryId) => {
  try {
    const objectId = new mongoose.Types.ObjectId(subcategoryId); // Convert to ObjectId

    const quizzes = await QuizModel.aggregate([
        { $match: { subcategory: objectId } }, // Ensure subcategory ID matches
        { $unwind: "$questions" }, // Flatten questions array
        { $sample: { size: 9 } }, // Get 9 random questions
        { 
            $project: { 
                _id: 0, 
                "questions.question": 1, 
                "questions.options": 1, 
                "questions.correctOption": 1 
            } 
        } 
    ]);

    return quizzes.map(q => q.questions); // Return only questions array
} catch (error) {
    console.error("Error fetching random questions:", error);
    return [];
}// Extract only the question objects
};


exports.getLatestQuizzes = async ({ page, limit, category, subcategory }) => {
    const query = {};
    
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    const quizzes = await QuizModel.find(query)
        .sort({ createdAt: -1 })  // Sort by latest
        .skip((page - 1) * limit) // Pagination
        .limit(limit)
        .populate('category subcategory'); // Populate category details

    const totalQuizzes = await QuizModel.countDocuments(query);

    return {
        quizzes,
        totalQuizzes,
        currentPage: page,
        totalPages: Math.ceil(totalQuizzes / limit)
    };
};








// exports.getAllQuizzes = async () => {
//   try {
//     const quizzes = await QuizModel.find()
//       .populate({
//         path: 'subcategory',
//         select: '-__v -quizzes -createdAt -updatedAt',
//         populate: {
//           path: 'category',
//           select: '-__v -subcategories -createdAt -updatedAt',
//         },
//       })
//       .lean(); // Use lean to get plain JavaScript objects

//     // Process quizzes to match the correctOption and remove _id fields
//     const cleanedQuizzes = quizzes.map((quiz) => {
//       const { _id, __v, ...quizWithoutId } = quiz; // Remove _id and __v from quiz

//       quizWithoutId.questions = quiz.questions.map((question) => {
//         const { _id: questionId, ...questionWithoutId } = question; // Remove _id from question

//         // Match the correct option based on the correctOption id
//         const correctOption = question.options.find(
//           (option) => option.id === question.correctOption.id
//         );
//         if (correctOption) {
//           questionWithoutId.correctOption = {
//             id: correctOption.id,
//             name: correctOption.name,
//           };
//         }

//         // Remove _id from options
//         questionWithoutId.options = question.options.map(({ _id: optionId, ...option }) => option);

//         return questionWithoutId;
//       });

//       return quizWithoutId;
//     });

//     return cleanedQuizzes;
//   } catch (error) {
//     throw new Error('Error fetching quizzes: ' + error.message);
//   }
// };


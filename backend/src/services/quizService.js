const QuizModel = require("../models/QuizModel");

const subcategoryModel = require("../models/subcategoryModel");

exports.createQuiz = async (title, subcategory, questions) => {
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

    const quiz = new QuizModel({ title, subcategory: subcategoryDoc._id, questions });
    return await quiz.save();

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


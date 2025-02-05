const quizService = require('../services/quizService');

exports.createQuiz = async (req, res) => {
  try {
    const { title, subcategory ,questions } = req.body;
    const quiz = await quizService.createQuiz(title, subcategory, questions);
    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error: error.message });
    console.log(error,"quiz error");
    
  }
  
};

exports.getQuizzesBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const quizzes = await quizService.getQuizzesBySubcategory(subcategoryId);
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
  }
};


exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
    console.log(error,"getall errror");
    
  }
};
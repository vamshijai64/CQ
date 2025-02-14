const quizService = require('../services/quizService');

exports.createQuiz = async (req, res) => {
  try {
    const { title, subcategory ,category,questions } = req.body;
    const quiz = await quizService.createQuiz(title, subcategory,category, questions);
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


exports.getRandomQuestionsBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    console.log("Fetching questions for subcategory:", subcategoryId);
    
    const questions = await quizService.getRandomQuestionsBySubcategory(subcategoryId);

    console.log("Fetched questions:", questions);

    res.status(200).json(questions);
} catch (error) {
    console.error("Error fetching random questions:", error);
    res.status(500).json({ message: "Error fetching random questions", error: error.message });
}
};




exports.getLatestQuizzes = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, subcategory } = req.query;

        const quizzes = await quizService.getLatestQuizzes({
            page: parseInt(page),
            limit: parseInt(limit),
            category,
            subcategory
        });

        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


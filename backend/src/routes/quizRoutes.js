const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const upload = require('../middlewares/uploadMiddleware');

// Routes for quizzes
router.post('/create', quizController.createQuiz);
router.get('/:subcategoryId', quizController.getQuizzesBySubcategory);
router.get("/subcategory/:subcategoryId/random", quizController.getRandomQuestionsBySubcategory);
router.get('/', quizController.getAllQuizzes);



module.exports = router;

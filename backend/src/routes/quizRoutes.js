const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Routes for quizzes
router.post('/create', quizController.createQuiz);
router.get('/:subcategoryId', quizController.getQuizzesBySubcategory);
router.get('/', quizController.getAllQuizzes);

module.exports = router;

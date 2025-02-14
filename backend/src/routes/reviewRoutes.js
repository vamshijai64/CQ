const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const upload = require('../middlewares/uploadMiddleware');
// router.post('/movies/:title/addReview', reviewController.addReview);
// Fetch reviews with sorting and filteringddReview);
// Fetch reviews with sorting and filtering
// Example: GET /reviews?sort=desc&rating=4&title=Inception
// router.get('/movies/:title/getReviews', reviewController.getReviews);
router.post('/movies/addReview',upload.single('image'), reviewController.addReview);
router.get('/movies/getReviews', reviewController.getReviews);
router.get('/movies/getReviews', reviewController.getAllReviews);
// router.get('/movies/:id/getReviews', reviewController.getReviews);

// router.post('/movies/:id/addReview', reviewController.addReview);

// // GET http://localhost:6000/review/movies/1/reviews?sort=desc
// // GET http://localhost:6000/review/movies/1/reviews?rating=4
// // GET http://localhost:6000/review/movies/1/reviews?userId=12345
// // GET http://localhost:6000/review/movies/1/reviews?sort=asc
// router.get('/movies/:id/getReviews', reviewController.getReviews);

module.exports = router;
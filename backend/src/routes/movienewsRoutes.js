const express = require('express');
const router = express.Router();
const movienewsController = require('../controllers/movienewsController');


//Admin routes
router.post('/addmovienews',movienewsController.addMovieNews);


//et a particular movie news by title
router.get('/:id',movienewsController.getMovieNewsById);


//this is the public route
router.get('/',movienewsController.getMovieNews);


module.exports = router;
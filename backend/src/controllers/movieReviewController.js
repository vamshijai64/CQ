    const movieReviewService = require('../services/movieReviewService');

    exports.addMovieReview = async (req, res) => {
        try {
            const { title, content, rating, user } = req.body;
    
           
    
            // Call the service to save the review
            const movieReview = await movieReviewService.addMovieReview({ title, content, rating, user });
    
            // Respond with success
            res.status(201).json({ message: 'Movie review added successfully', movieReview });
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log('movieReview error:', error);
        }
    };

    exports.getMovieReviewBytitle = async (req, res) => {
        
        try {
            const title = req.params.title;
            const review = await movieReviewService.getMovieReviewBytitle(title);
            res.json(review);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    exports.getMovieReviews = async (req, res) => {
        try {
            const reviews = await movieReviewService.getMovieReviews();
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

const reviewService = require('../services/reviewService');

exports.addReview = async (req, res) => {
    try {
        const { userId, rating, reviewText, title } = req.body;

        // ✅ Get image path from uploaded file
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const review = await reviewService.addReview({userId, rating, reviewText, title, imageUrl });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
        
    }
};

exports.getReviews = async (req, res) => {
    try {
        const { title } = req.body;

        const reviews = await reviewService.getReviews(title);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {

        const reviews = await reviewService.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// exports.getReviews = async (req, res) => {
//     try {
//         const { title } = req.query;
//         const { sort = 'desc', rating, userId } = req.query;

//         if(!title) {
//             return res.status(400).json({ error: 'Movie title is required' });
//         }

//         const reviews = await reviewService.getReviews(title, { sort, rating, userId });
//         res.status(200).json(reviews);
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }


// With Movie Model reference
// exports.addReview = async (req, res) => {
//     try {
//         const { id: movieId } = req.params;
//         const reviewData = req.body;

//         // const { rating, reviewText } = req.body;
//         // Get userId from authenticated user (e.g., via JWT or session middleware)
//         // const userId = req.user.id;
//         // const review = await reviewService.addReview(movieId, { userId, rating, reviewText });
        
//         const review = await reviewService.addReview(movieId, reviewData);
//         res.status(201).json(review);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getReviews = async (req, res) => {
//     try {
//         const { id: movieId } = req.params;
//         const { sort = 'desc', rating, userId } = req.query;

//         const reviews = await reviewService.getReviews(movieId, { sort, rating, userId });
//         res.status(200).json(reviews);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }  
// };
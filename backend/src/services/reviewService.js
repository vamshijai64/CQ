
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

exports.addReview = async (title, reviewData) => {
    const { userId, rating, reviewText,imageUrl } = reviewData;

    const existingUser = await User.findById(userId);
    if(!existingUser) throw new Error('User does not exist');

    const review = new Review({ user: userId, title,imageUrl, rating, reviewText });
    await review.save();
    return review;
};

exports.getReviews = async (title) => {
    return await Review.find({ title }).sort({ createdAt: -1 }).populate('user', 'username');
};

exports.getAllReviews = async () => {
    return await Review.find().sort({ createdAt: -1 }).populate('user', 'username');
};

// exports.getReviews = async (title, filters) => {
//     const { sort, rating, userId } = filters;

//     const query = { title }

//     if (rating) query.rating = Number(rating);
//     if (userId) query.user = userId;

//     return await Review.find(query).sort({ rating: sort === 'desc' ? -1 : 1 }).populate('user', 'name');
// };


// With Movie Model reference
// exports.addReview = async (movieId, reviewData) => {
//         const { userId, rating, reviewText } = reviewData;
        
//         // Update average rating and associate review with movie
//         const movie = await Movie.findById(movieId);
//         if(!movie) {
//             throw new Error('Movie not found');
//         }

//         // Optionally check for duplicate review
//         // const existingReview = await Review.findOne({ movie: movieId, user: userId });
//         // if (existingReview) {
//         //     throw new Error('User has already reviewed this movie');
//         // }

//         const review = new Review({ user: userId, movie: movieId, rating, reviewText });
//         await review.save();

//         movie.reviews.push(review._id);
        
//         // Update average rating
//         // const reviews = await Review.find({ movie: movieId });
//         // const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
//         // movie.averageRating = avgRating;

//         // Optimized average rating calculation
//         movie.averageRating = ((movie.averageRating * movie.reviews.length) + rating) / (movie.reviews.length + 1);

//         await movie.save();
//         return review;
// };

// exports.getReviews = async (movieId, filters) => {
//     const { sort, rating, userId } = filters;

//     const query = { movie: movieId }; 

//     if (rating) query.rating = Number(rating); // Filter by specific rating
//     if (userId) query.user = userId; // Filter by specific user

//     // Fetch reviews with dynamic query and sort by rating
//     return await Review.find(query).sort({ rating: sort === 'desc' ? -1 : 1 }) // Sorting based on query parameter
//     .populate('user', 'name') // Populate user field to get user details (if needed)
//     .populate('movie', 'title'); // Populate movie field to get movie details (if needed)
// };
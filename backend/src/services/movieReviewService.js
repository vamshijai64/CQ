const MovieReviewModel=require('../models/movieReview')

exports.addMovieReview = async ({ title, content, rating, user }) => {
    const review = new MovieReviewModel({
        title,
        content,
        rating,
        user,
    });
    return await review.save();
};
exports.getMovieReviews=async(req,res)=>{
    return await MovieReviewModel.find().sort({createdAt:-1}).populate('user');

}

exports.getMovieReviewBytitle = async (title) => {
    return await MovieReviewModel.findOne({ title }).populate('user');
}


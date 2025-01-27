const MovieNewsModel= require('../models/movienewsModel');

exports.addMovieNews = async ({ title, description, imageUrl }) => {
    // Create a new instance of the MovieNewsModel
    const news = new MovieNewsModel({
        title,
        description,
        imageUrl,
    });

    console.log(news); // Debugging: Logs the news object before saving
    return await news.save(); // Save the document to the database
};
exports.getMovieNews = async () => {

    //Return  latest new first
    return await MovieNewsModel.find().sort({ createdAt: -1 });
}

exports.getMovieNewsById=async(id)=>{

    return await MovieNewsModel.findById(id);
}

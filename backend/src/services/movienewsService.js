const MovieNewsModel= require('../models/movienewsModel');

exports.addMovieNews = async ({ title, description, imageUrl }) => {
    // Create a new instance of the MovieNewsModel
    try {
        const news = new MovieNewsModel({
          title,
          description,
          imageUrl,
        });
    
        return await news.save(); // ✅ Save news
      } catch (error) {
        throw new Error("Error saving movie news: " + error.message);
      }
    };

// exports.getMovieNews = async () => {

//     //Return  latest new first
//     return await MovieNewsModel.find().sort({ createdAt: -1 });
// }
exports.getMovieNews = async () => {
    const newsList = await MovieNewsModel.find().sort({ createdAt: -1 });

    //  Format time before sending response
    return newsList.map(news => ({
        ...news._doc,
        createdAt: new Date(news.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) // Adjust time zone if needed
    }));
};

exports.getMovieNewsById = async (id) => {
    const news = await MovieNewsModel.findById(id);
    if (!news) return null;
    
    return {
        ...news._doc,
        createdAt: new Date(news.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    };
};

exports.getLatestMovieNews = async ({ page, limit, search }) => {
    const query = {};
    if (search) query.title = { $regex: search, $options: "i" }; // Case-insensitive search

    const news = await MovieNewsModel.find(query)
        .sort({ createdAt: -1 })  // Sort by latest
        .skip((page - 1) * limit) // Pagination
        .limit(limit);

    const totalNews = await MovieNewsModel.countDocuments(query);

    return {
        news,
        totalNews,
        currentPage: page,
        totalPages: Math.ceil(totalNews / limit)
    };
};




// exports.getMovieNewsById=async(id)=>{

//     return await MovieNewsModel.findById(id);
// }

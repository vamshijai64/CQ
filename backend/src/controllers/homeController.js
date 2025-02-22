// homeController.js
const movieNewsService = require('../services/movienewsService');
const movieReviewService = require('../services/movieReviewService');
const quizService = require('../services/quizService');
const categoryService = require('../services/categoryService');
const subcategoryService = require('../services/subcategoryService');
const bannerService = require('../services/bannerService');
const movieReviewmodel =require('../models/movieReview')
const reviewModel =require('../models/reviewModel')
const reviewSerivce = require('../services/reviewService')
const movieNewsmodel=require('../models/movienewsModel')
const bannermodel= require('../models/BannerModel')
const category=require('../models/CategeoryModel')



exports.gethome = async (req, res) => {
  try {
    const sections = [
      { key: "movieNews", model: movieNewsmodel, limit: 15 },
      { key: "movieReviews", model: reviewModel, limit: 15 },

      // { key: "movieReviews", model: movieReviewmodel, limit: 5 },
      { key: "categories", model: category, limit: 10 }
    ];

    let banners = [];
    let response = [];

    for (const section of sections) {
      // Fetch actual data for banners and response
      const sectionData = await section.model.find()
        .select("-__v") // Exclude unwanted fields like versioning
        .sort({ createdAt: -1 })
        .limit(section.limit);

      // Store same data in both banners and response
      banners.push({ type: section.key, data: sectionData });
      response.push({ type: section.key, data: sectionData });
    }

    res.json({
      banners,
      response
    });

  } catch (error) {
    console.error('Error fetching homepage data', error);
    res.status(500).json({ error: 'Failed to load homepage data' });
  }
};

//exports.gethome = async (req, res) => {
//   try {
//     const sections = [
//       { key: "movieNews", model: movieNewsmodel, limit: 15 },
//       { key: "movieReviews", model: review, limit: 5 },
//       { key: "categories", model: category, limit: 10 }
//     ];

//     let banners = [];
//     let response = [];

//     for (const section of sections) {
//       // Fetch banners specific to each section
//       const bannerData = await bannermodel.find({ isActive: true, bannerType: section.key })
//         .select("_id name imageUrl startDate enddate createdAt updatedAt")  // Only banner fields
//         .sort({ createdAt: -1 })
//         .limit(5);

//       // Fetch actual content data for each section
//       const sectionData = await section.model.find()
//         .select("-__v") // Exclude unwanted fields like versioning
//         .sort({ createdAt: -1 })
//         .limit(section.limit);

//       banners.push({ type: section.key, data: bannerData });
//       response.push({ type: section.key, data: sectionData });
//     }

//     res.json({
//       banners,
//       response
//     });

//   } catch (error) {
//     console.error('Error fetching homepage data', error);
//     res.status(500).json({ error: 'Failed to load homepage data' });
//   }
// };

// exports.gethome = async (req, res) => {
//   try {
//     const sections = [
//       { key: "movieNews", model: movieNewsmodel, limit: 15 },
//       { key: "movieReviews", model: review, limit: 5 },
//       { key: "categories", model: category, limit: 10 }
//     ];

//     let banners = [];
//     let response = [];

//     // Process each section dynamically
//     for (const section of sections) {
//       const bannerData = await bannermodel.find({ isActive: true, bannerType: section.key }).sort({ createdAt: -1 }).limit(5);
//       const sectionData = await section.model.find().sort({ createdAt: -1 }).limit(section.limit);

//       banners.push({ type: section.key, data: bannerData });
//       response.push({ type: section.key, data: sectionData });
//     }

//     // Final response format
//     res.json({
//       banners,
//       response
//     });

//   } catch (error) {
//     console.error('Error fetching homepage data', error);
//     res.status(500).json({ error: 'Failed to load homepage data' });
//   }
// };

//ist working code accept few chnages///////////
// exports.gethome = async (req, res) => {

//   try {
//     // Fetch top 5 active banners for each type
//     const movieNewsBanners = await bannermodel.find({ isActive: true, bannerType: 'movieNews' }).sort({ createdAt: -1 }).limit(5);
//     const movieReviewsBanners = await bannermodel.find({ isActive: true, bannerType: 'movieReviews' }).sort({ createdAt: -1 }).limit(5);
//     const categoriesBanners = await bannermodel.find({ isActive: true, bannerType: 'categories' }).sort({ createdAt: -1 }).limit(5);

//     // Fetch latest 15 movie news and update banners if a new one is added
//     const movieNews = await movieNewsmodel.find().sort({ createdAt: -1 }).limit(15);
    
//     // If a new movieNews is added, update banners (optional logic)
//     if (movieNews.length > 0) {
//       const latestMovieNews = movieNews[0]; // Get the latest added movieNews
//       const existingBanner = await bannermodel.findOne({ relatedId: latestMovieNews._id, bannerType: 'movieNews' });

//       if (!existingBanner) {
//         await bannermodel.create({
//           name: latestMovieNews.title,
//           imageUrl: latestMovieNews.imageUrl,
//           bannerType: 'movieNews',
//           isActive: true,
//           relatedId: latestMovieNews._id
//         });
//       }
//     }

//     // Fetch the latest movie reviews
//     const movieReviews = await review.find().sort({ createdAt: -1 }).limit(5);

//     // Fetch categories with subcategories and associated quizzes
//     const categories = await category.find()
//       .populate({
//         path: 'subcategories',
//         populate: { path: 'quizzes' }
//       });

//     res.json({
//       banners: [
//         { type: 'movieNews', data: movieNewsBanners },
//         { type: 'movieReviews', data: movieReviewsBanners },
//         { type: 'categories', data: categoriesBanners }
//       ],
//       movieNews,
//       movieReviews,
//       categories,
//     });

//   } catch (error) {
//     console.error('Error fetching homepage data', error);
//     res.status(500).json({ error: 'Failed to load homepage data' });
//   }
// };

exports.getAllData = async (req, res) => {

   try {
    const { section } = req.query;
    const data = {};

    if (section === 'movienews') {
      // Step 1: Fetch the latest 5 banners related to movie news
      const latestBanners = await bannermodel
        .find({ bannerType: 'movieNews' })
        .sort({ createdAt: -1 })
        .limit(5);

      // Step 2: Extract related movie news IDs from banners
      const excludedIds = latestBanners.map(banner => banner.relatedId);

      // Step 3: Fetch only movie news that are NOT in banners
      data.movieNews = await movieNewsmodel
        .find({ _id: { $nin: excludedIds } }) // Exclude old news
        .sort({ createdAt: -1 });

    } else if (section === 'reviews') {
      // data.movieReviews = await movieReviewService.getMovieReviews();
      data.movieReviews=await reviewSerivce.getAllReviews()
    } else if (section === 'subcategories') {
      data.subcategories = await subcategoryService.getAllSubcategories();
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch data for the selected section' });
  }
};





//-----------WORKING CODE==========
// exports.getAllData = async (req, res) => {
//   try {
//     const { section } = req.query;
//     const data = {};

//     if (section === 'movienews') {
//       data.movieNews = await movieNewsService.getMovieNews();
//     }

//     if (section === 'moviereviews') {
//       data.movieReviews = await movieReviewService.getMovieReviews();
//     }

//     if (section === 'subcategories') {
//       data.subcategories = await subcategoryService.getAllSubcategories();
//     }

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Unable to fetch data for the selected section' });
//   }
// }





//////////////////////////////////old code//////////////////////////////////////////////////////////////
exports.getHomePageData = async (req, res) => {

  try {
    const {
      movienews_limit = 10, 
      moviereview_limit = 10, 
      subcategories_limit = 10,
      section = 'home'
    } = req.query;

    const data = {};

    // Banners Section with specific categories
    if (section === 'home' || section === 'banners') {
      data.banners = [
        { name: 'MovieNews' },
        { name: 'MovieReviews' },
        { name: 'Categories' }
      ];
    }

    // Movie News Section
    if (section === 'home' || section === 'movienews') {
      data.movieNews = await movieNewsService.getMovieNews().then(news => news.slice(0, parseInt(movienews_limit)));
    }

    // Movie Reviews Section
    if (section === 'home' || section === 'moviereviews') {
      data.movieReviews = await movieReviewService.getMovieReviews().then(reviews => reviews.slice(0, parseInt(moviereview_limit)));
    }

    // Subcategories Section
    if (section === 'home' || section === 'subcategories') {
      data.subcategories = await subcategoryService.getAllSubcategories().then(subcategories => subcategories.slice(0, parseInt(subcategories_limit)));
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch home page data' });
  }
};




















///gethome single api 

  // try {
  //   // Fetch banners grouped by type
  //   const movieNewsBanners = await bannermodel.find({ bannerType: 'movieNews' }).sort({ createdAt: -1 }).limit(5);
  //   const movieReviewsBanners = await bannermodel.find({ bannerType: 'movieReviews' }).sort({ createdAt: -1 }).limit(5);
  //   const quizzesBanners = await bannermodel.find({ bannerType: 'categories' }).sort({ createdAt: -1 }).limit(5);

  //   res.json({
  //     banners: [
  //       { type: 'movieNews', data: movieNewsBanners },
  //       { type: 'movieReviews', data: movieReviewsBanners },
  //       { type: 'quizzes', data: quizzesBanners },
  //     ],
  //   });
  // } catch (error) {
  //   console.error('Error fetching banners', error);
  //   res.status(500).json({ error: 'Failed to fetch banners' });
  // }
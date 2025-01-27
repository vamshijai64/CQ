const movieNewsService = require('../services/movienewsService');


exports.addMovieNews = async (req, res) => {
    try {
        // Extract the fields from the request body
        const { title, description, imageUrl } = req.body;

        // // Validation for missing fields
        // if (!title || !description || !imageUrl) {
        //     return res.status(400).json({ error: "All fields (title, description, imageUrl) are required." });
        // }

        // Call the service layer to handle the business logic
        const news = await movieNewsService.addMovieNews({ title, description, imageUrl });

        res.status(201).json({ message: "Movie news added successfully", news });
        console.log(news, "movienews");
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("movienews error:", error);
    }
};


exports.getMovieNewsById=async(req,res)=>{
    try{
        const {id}=req.params
        const news=await movieNewsService.getMovieNewsById(id);
        if (!news) {
            return res.status(404).json({ error: "Movie news not found" });
        }
        res.json(news);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}
exports.getMovieNews = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        const news = await movieNewsService.getMovieNews({ title, description, imageUrl });
        
        res.status(201).json({ message: 'Movie news added successfully', news });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error,"movienews error");
        
    }
};


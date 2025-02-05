
const categoryService=require('../services/categoryService')

exports.createCategory=async(req,res)=>{
    try {

        const {name,imageUrl}=req.body;
        const catgory= await categoryService.createCategory(name,imageUrl);
        res.status(201).json({catgory})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
 }
  exports.getCategories = async (req, res) => {

        try {
          const categories = await categoryService.getAllCategories();
          res.status(200).json(categories);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching categories', error: error.message });
        }
        
      };
    
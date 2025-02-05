const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet');
// require('dotenv-safe').config();
require('dotenv').config();

const { errorHandler } = require('./middlewares/errorHandler');

const connectDB = require('./configs/database');

const userRoutes = require('./routes/userRoutes')
const movieNewsRoutes= require('./routes/movienewsRoutes');
const movieReviewRoutes= require('./routes/movieReviewRoutes')
const categoryRoutes=require('./routes/categoryRoute')
const subcategoryRoutes=require('./routes/subcategoryRoute')
const quizRoutes=require('./routes/quizRoutes')
const homeRoutes = require("./routes/homeRoutes");
const reviewRoutes = require('./routes/reviewRoutes');
const bannerRoutes=require('./routes/bannerRoutes')


// require('./utils/scheduleOtp') //Periodically clear expired OTP records from the database to avoid bloating the collection.

const port = process.env.PORT;

connectDB();

app.use((req,res,next)=>{ // Middleware to log the request method and URL
    console.log(`${req.method} ${req.url}`);
    next();
})

// Middlewares
app.use(cors())
app.use(helmet()); // Secure HTTP headers
app.use(express.json())

app.use('/user', userRoutes)
app.use("/api", bannerRoutes); 
app.use('/movienews', movieNewsRoutes);
app.use('/movieReviews', movieReviewRoutes);
app.use('/categories', categoryRoutes);
app.use('/subcategories', subcategoryRoutes);
app.use('/review', reviewRoutes)
app.use('/quizzes', quizRoutes);
app.use('/home', homeRoutes);





// Error Handling Middleware
app.use(errorHandler);

app.listen(port, () => { 
    console.log(`Server running on http://localhost:${port}/`)
});
app.get('/te', (req, res) => {
    res.send('Server is up and running!');
});

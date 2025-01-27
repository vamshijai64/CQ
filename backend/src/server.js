const express = require('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet');
require('dotenv-safe').config();
const { errorHandler } = require('./middlewares/errorHandler');

const connectDB = require('./configs/database');

const userRoutes = require('./routes/userRoutes')
const movieNewsRoutes= require('./routes/movienewsRoutes');
const movieReviewRoutes= require('./routes/movieReviewRoutes')


// require('./utils/scheduleOtp') //Periodically clear expired OTP records from the database to avoid bloating the collection.

const port = process.env.PORT;

connectDB();

// Middlewares
app.use(cors())
app.use(helmet()); // Secure HTTP headers
app.use(express.json())

app.use('/user', userRoutes)
app.use('/movienews', movieNewsRoutes);
app.use('/movieReviews', movieReviewRoutes);


// Error Handling Middleware
app.use(errorHandler);

app.listen(port, () => { 
    console.log(`Server running on http://localhost:${port}/`)
});
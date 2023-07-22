const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path: './config.env'});
require("dotenv").config();
const app = express();
app.use(express.json());
const path = require("path");
const cors = require("cors");
app.use(cors());

const connectDB = require("./config/db");
connectDB()

// Import route files
const contactUsRoutes = require("./routes/contactUsRoutes");
const userRoutes = require("./routes/userRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const userfeedbackRoutes = require("./routes/userfeedbackRoutes");
const addtowatchlistRoutes = require("./routes/addtowatchlistRoutes");


// Use routes
app.use("/contact-us", contactUsRoutes);
app.use("/users", userRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/add-to-watchlist", addtowatchlistRoutes);
app.use("/feedback", userfeedbackRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
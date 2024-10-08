const dotenv = require("dotenv");
const app = require("./app");
const cloudinary = require("cloudinary").v2;
const connectDatabase = require("./config/database");

//handeling uncaught exception
process.on("uncaughtExceptionMonitor", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});
dotenv.config({ path: "Backend/config/config.env" });
connectDatabase();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});
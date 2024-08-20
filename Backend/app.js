const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
//route import
const user = require("./routes/userRoutes");
const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// Allow requests from http://localhost:3000
app.use(cors({
  origin: ['http://192.168.100.7:3000','http://localhost:3000','*'],
  credentials: true
}));
app.use("/api/v1", user);


//middleware for error
const errorMiddleware = require("./middleware/errors");
app.use(errorMiddleware);
module.exports = app
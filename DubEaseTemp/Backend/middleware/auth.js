const ErrorHandler = require("../utils/errorHandler");
const catchAsncError = require("./catchAsncError");
const jwt = require("jsonwebtoken");
const User = require("../modules/userModels")
exports.isAuthenticatedUser = catchAsncError(async (req, res, next) => {
    const { token } = await req.cookies;
   
    
    if (!token) {
        
        return next(new ErrorHandler("Pleade Login to acess this resource", 401));
        

    }
    //checking cookie with id of user and secret key cookie token have login information
    const decodedData = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = await User.findById(decodedData.id);
    next();
});

  

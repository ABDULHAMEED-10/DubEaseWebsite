const ErrorHandler = require("../utils/errorHandler");
const catchAsncError = require("../middleware/catchAsncError");
const User = require("../models/userModels");
const bcrypt = require('bcrypt');
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require('cloudinary').v2;

exports.registerUser = catchAsncError(async (req, res, next) => {
    
    const opt = {
        folder: "avatars",
        width: 150,
        crop: "scale",
    };
    let myCloud; 
    try {
        myCloud = await cloudinary.uploader.upload(req.body.avatar, opt);
        const { name, email, password } = req.body;
    
   
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                "public_id": myCloud.public_id,
                "url": myCloud.secure_url,
            },
            createdAt: Date.now(),
        });
        sendToken(user, 201, res);
    }
    catch (error) {
        if (error.code === 11000 && error.keyPattern.email === 1) {
            res.status(400).json({success:false, message: 'Email already exists.' });
        }
        if (error.code === 500) {
            return res.status(500).json({
                success: false,
                message: "Image size exceed limits",
            });
            
        }

        else {
            res.status(400).json({
                success: false,
                message: "Error while registeration",
            });
           
          }
      }
      
});
//login user
exports.loginUser = catchAsncError(async (req, res, next) => {
    let { email, password } = req.body;
        if (!email && !password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter email and password",
            });
            
            
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email and Password",
            });
            
            
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
            

    
    }
    
    sendToken(user, 200, res); 
       
});
//log out user

exports.logout = catchAsncError(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
   
});

//forgot password
exports.forgetPassword = catchAsncError(async (req, res, next) => {
    //reset password
 
    const user = await User.findOne({ email: req.body.email });
   
    if (!user) {
        
        return res.status(404).json({
            success: false,
            message: `No User registered with Email `,
        });
         
    }
    else {
        //get reset Password token
       
        const resetToken = crypto.randomBytes(20).toString("hex");
        //hashing and storing in resetpasswordtoken in schema
        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
        await user.save({ validateBeforeSave: false });
        const resetPasswordURL = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;
        const message = `<p><strong>Subject:</strong> Password Reset Request</p>
    <br>
    <p>Dear ${user.name},</p>
    <br>
    <p>We have received a request to reset your password for your ${user.name} account.
    To proceed with the password reset, Please copy and paste in Browser on the following link:</p>
    <p>${resetPasswordURL}</p>
    <br>
    <p>If you did not initiate this request, please ignore this email. Your account is <strong>Secure</strong>, and no changes will be made.</p>
    <br>
    <p>Please note that the password reset link is only valid for a limited time for security reasons
    If you need further assistance or have any questions, please don't hesitate to contact our support team at Gmail account abdulhameeed000650@gmail.com.</p>
    <br>
    <p>Best regards,<br>The DubEase Team</p>`;
   
    
        try {
        
            await sendEmail({
                email: user.email,
                subject: "Password Reset Request",
                message,
            });
         
      
            return res.status(200).json({
                success: true,
                message: `Email send successfully`,
                
            });
   
        }
        catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(500).json({
                success: false,
                message: `Email send unsuccessfully`,
            });
            // return next(new ErrorHandler(error.stack, 500));
        
        }
    }
});

//reset password
exports.resetPassword = catchAsncError(async (req, res, next) => {
    
    //creating token haash
    const resetPasswordToken= crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    //finding token
  
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
        
        
    });
    
    
    if (!user) {
        return res.status(400).json({
            success: false,
            message: `Reset Password Token Expire `,
        });
        
    }
   
   
    if (req.body.password !== req.body.confirmedPassword) {
        return res.status(400).json({
            success: false,
            message: `Password Does not matched `,
        });
        
    }
   
    //updating in database
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    //login because password change
    sendToken(user, 200, res);
})

//get User details
exports.getUserDetails = catchAsncError(async (req, res, next) => { 
   
    const user = await User.findById(req.user.id);
    

    res.status(200).json({
        success: true,
        user,
    });
    
})
//update password
exports.updateUserPassword = catchAsncError(async (req, res, next) => {
    
    const user = await User.findById(req.user.id).select("+password");
    
    const isOldPasswordMatched = await bcrypt.compare(req.body.oldPassword,user.password);
    if (!isOldPasswordMatched) {
        res.status(401).json({
            success: false,
            message: "Invalid old password",
        });
        return

    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        res.status(401).json({
            success: false,
            message: "password does not match",
        });
        return

    }
    user.password = req.body.newPassword
    await user.save();
    sendToken(user, 200, res);

    
    
})
//delete Account
exports.deleteUser = catchAsncError(async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // const imageId = user.avatar.public_id; 
        // await cloudinary.uploader.destroy(imageId);
        res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
//update profile
exports.updateProfile = catchAsncError(async (req, res, next) => {
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
  
      if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
          
          
        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
  
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
  
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
  
      res.status(200).json({
        success: true,
      });
    }
    catch (error) {
        if (error.code === 11000 && error.keyPattern.email === 1) {
            return res.status(400).json({ success: false, message: 'Email already exists.' });
            
        }
        if (error.code === 500) {
            return res.status(500).json({
                success: false,
                message: "Image size exceed limits",
            });
            
        }

        else {
            return res.status(400).json({
                success: false,
                message: "Error while updating Profile",
            });
            
           
          }
      }
});
  

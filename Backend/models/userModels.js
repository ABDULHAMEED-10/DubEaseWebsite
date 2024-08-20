const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed more than 30 characters"],
        minLength:[4,"Name cannot be less than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate:[validator.isEmail,"Please Enter valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your password"],
        select:false, 
        minLength:[8,"password cannot be less than 8 characters"]

    },
    
    avatar: {
        
            public_id: {
                type: String,
                required:true
            },
            url: {
                type: String,
                required:true
            }
    },
    role: {
        type: String,
       default: "user"
    },
    createdAt: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});
userSchema.pre("save", async function (next) {
    //password should be hash one time
    if (!this.isModified("password")) {
        next();
    }
    //if password change then it should be encrypt
    this.password = await bcrypt.hash(this.password, 10)//10 is power strongness
});
//(seesion)jwt token genrate toke and store in cookies so that it remain login
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRETKEY, {
        expiresIn: process.env.JWT_EXPIRE
    });
};




module.exports = mongoose.model("user",userSchema);

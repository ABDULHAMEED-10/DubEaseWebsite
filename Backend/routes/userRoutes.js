const express = require("express");
const { registerUser, loginUser, logout,forgetPassword,getAllUser, resetPassword,getUser ,deleteUser,updateUserRole,updateProfile,getUserDetails, updateUserPassword} = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

// const role = authorizeRoles("admin");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/forget").post(forgetPassword);
router.route("/password/update").put(isAuthenticatedUser,updateUserPassword);
router.route("/me/update").put( isAuthenticatedUser,updateProfile);
router.route("/delete").delete(isAuthenticatedUser, deleteUser);




module.exports = router;
import User from "../model/userModel.js";
import { createToken } from "../utils/token.js";

const signUp = async (req, res) => {
  const { fullname, email, username, password, confirmPassword } = req.body;
  try {
    // Check if all fields are provided
    if (!fullname || !email || !username || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login",
      });
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await User.create({
      fullname,
      email,
      username,
      password,
      confirmPassword,
    });
    const token = createToken(user._id);
    // Set token in cookie
    user.token = token;
    res
      .status(201)
      .cookie("token", token)
      .json({
        success: true,
        message: "User created successfully",
        user,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const login = async (req, res) => {
  const { entry, password } = req.body;
  try {
    // Check if all fields are provided
    if (!entry || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    // Check if user exists
    const doesUserExist = await User.findOne({
      $or: [{ email: entry }, { username: entry }],
    });
    if (!doesUserExist) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, please sign up",
      });
    }
    // Check if password is correct
    // Now login the user
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: doesUserExist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const logout = async (req, res) => {
  try{
    console.log(req.user);
    if(!req.user ||!req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Cannot recognize userId, Please try again",
      });
    }
    const user = await user
      .findById(req.user._id)
      .toString()
      .replace(/^String\("(.*)"\)$/, "$1");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Clear the token from the cookie
    res.clearCookie("token", { httpOnly: true, secure: true });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  }
  catch (error) {}
};
const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    // Check if user exists
    const doesUserExist = await User.findById(userId);
    if (!doesUserExist) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    // Delete user
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export { signUp, login, logout, deleteAccount };

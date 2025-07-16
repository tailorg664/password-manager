import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import { createToken } from "../utils/token.js";

function formatUser(user) {
  const { fullname, email, username, _id } = user;
  return { id: _id, fullname, email, username };
}

const signUp = async (req, res) => {
  const { fullname, email, username, password } = req.body;
  try {
    if (!fullname || !email || !username || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists, please login" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, username, password: hashedPassword });

    const token = createToken(user._id);

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // set true in prod with HTTPS
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        success: true,
        message: "User signed up successfully",
        token, // include for Postman/Mobile
        user: formatUser(user),
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { entry, password } = req.body;
  try {
    if (!entry || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const user = await User.findOne({
      $or: [{ email: entry }, { username: entry }],
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist, please sign up" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const token = createToken(user._id);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // set true in prod with HTTPS
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User logged in successfully",
        token,
        user: formatUser(user),
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "Lax" });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    await User.findByIdAndDelete(userId);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user: formatUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { signUp, login, logout, deleteAccount, checkAuth, formatUser };

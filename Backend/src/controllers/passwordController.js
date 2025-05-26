import User from "../model/userModel.js";
import Password from "../model/passwordModel.js";
import { encryptPassword, decryptPassword } from "../utils/passwordLocking.js";
import generatePassword from "../utils/passwordGenerator.js";
const savePassword = async (req, res) => {
  const { title, password, username } = req.body;
  try {
      //condition to check if the user is logged in or not
      if (!req.user) {
              return res.status(401).json({ message: "User not logged in, please log-in to use the service." });
      }
      if (!title || !password || !username) {
          return res.status(400).json({ message: "Please fill all fields" });
      }
      // Check if password is strong enough
      if(password.length <6){
              return res.status(422).json({ message: "Password is too weak" });
      }
    const hashedPassword = encryptPassword(password);
    const newPassword = new Password({
      site: title,
      password: hashedPassword,
      username: username,
      userId: req.user._id,
    });
    await newPassword.save();
    res.status(200).json({ message: "Password saved successfully" });
  } catch (error) {
    console.log(
      "Error occured while saving the password: ",
      error.message,
      " At: ",
      error.title
    );
  }
};
const getPassword = async (req, res) => {
      const { id } = req.params;
  try {
      if(!req.user) {
          return res.status(401).json({ message: "User not logged in, please log-in to use the service." });
      }
      const password = await Password.findById(id);
      if (!password) {
          return res.status(404).json({ message: "Password not found" });
      }
      const decryptedPassword = decryptPassword(password.password);
      res.status(200).json({ message: "Password fetched successfully", password: decryptedPassword });
  } catch (error) {
      console.log(
        "Error occured while fetching the password: ",
        error.message,
        " At: ",
        error.title
      );
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
const deletePassword = async (req, res) => {
  try {
      //condition to check if the user is logged in or not
      if (!req.user) {
        return res.status(401).json({ message: "User not logged in, please log-in to use the service." });
      }
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Please provide a password id" });
      }
      const password = await Password.findByIdAndDelete(id);
      if (!password) {
        return res.status(404).json({ message: "Password not found" });
      }
      res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
      console.log(
        "Error occured while deleting the password: ",
        error.message,
        " At: ",
        error.title
      );
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
const updatePassword = async (req, res) => {
      const { id } = req.params;
      const {password} = req.body;
  try {
      if(!req.user){
            return res.status(401).json({ message: "User not logged in, please log-in to use the service." });
      }
      if(!id){
            return res.status(400).json({ message: "No id found" });
      }
      if (!password) {
            return res.status(400).json({ message: "Please provide a password" });
      }
      if(password.length < 6){
            return res.status(422).json({ message: "Password is too weak" });
      }
      
      const hashedPassword = encryptPassword(password);
      await Password.findByIdAndUpdate(id, { password: hashedPassword });
      res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
      console.log(
        "Error occured while updating the password: ",
        error.message,
        " At: ",
        error.title
      );
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};
const generatePassword = async (req, res) => {
      const { length,options} = req.body;
  try {
      if(!req.user) {
          return res.status(401).json({ message: "User not logged in, please log-in to use the service." });
      }
      if(!length) {
          return res.status(400).json({ message: "Please provide a length" });
      }
      if(length < 6) {
          return res.status(422).json({ message: "Password is weak, would you like to have a strong password" });
      }
      const password = generatePassword(length, options);
      if(!password) {
          return res.status(400).json({ message: "Please provide a valid length" });
      }
      res.status(200).json({message: "Password generated: " ,password: password });
      
  } catch (error) {
      console.log(
        "Error occured while generating the password: ",
        error.message,
        " At: ",
        error.title
      );
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

export { savePassword, getPassword, deletePassword, updatePassword, generatePassword };
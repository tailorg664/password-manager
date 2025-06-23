import Password from "../model/passwordModel.js";
import { encryptPassword, decryptPassword } from "../utils/passwordLocking.js";
import passwordGenerator from "../utils/passwordGenerator.js";
const savePassword = async (req, res) => {
  const { name, url, username, password } = req.body;
  try {
    //condition to check if the user is logged in or not
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({
          message: "User not logged in, please log-in to use the service.",
        });
    }
    if (!name || !password || !username || !url) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    // Check if password is strong enough
    if (password.length < 6) {
      return res.status(422).json({ message: "Password is too weak" });
    }
    await Password.create({
      name: name,
      url: url,
      password: encryptPassword(password),
      username: username,
      userId: user._id,
    });

    res.status(200).json({ message: "Password saved successfully" });
  } catch (error) {
    console.log("Error occured while saving the password: ", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error.",
        error: error.message,
      });
  }
};
const getPassword = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({
          message: "User not logged in, please log-in to use the service.",
        });
    }
    const passwords = await Password.find({ userId: user.id }).sort({
      updatedAt: -1,
    });
    if (!passwords) {
      return res.status(404).json({ message: "Password not found" });
    }
    const decryptedPassword = passwords.map((p) => ({
      ...p.toObject(),
      password: decryptPassword(p.password),
    }));
    res
      .status(200)
      .json({
        message: "Passwords fetched successfully",
        data: decryptedPassword,
      });
  } catch (error) {
    console.log("Error occured while fetching the password: ", error.message);
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
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({
          message: "User not logged in, please log-in to use the service.",
        });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No password detected." });
    }
    const password = await Password.findByIdAndDelete(id);
    if (!password) {
      return res.status(404).json({ message: "Password not found" });
    }
    res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
    console.log("Error occured while deleting the password: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const updatePassword = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { password } = req.body;
  try {
    if (!user) {
      return res
        .status(401)
        .json({
          message: "User not logged in, please log-in to use the service.",
        });
    }
    if (!id) {
      return res.status(400).json({ message: "No id found" });
    }
    if (!password) {
      return res.status(400).json({ message: "Please provide a password" });
    }
    if (password.length < 6) {
      return res.status(422).json({ message: "Password is too weak" });
    }

    const hashedPassword = encryptPassword(password);
    await Password.findByIdAndUpdate(id, { password: hashedPassword });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log("Error occured while updating the password: ", error.title);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
// const generatePassword = async (req, res) => {
//       const { length,options} = req.body;
//   try {
//       if(!req.user) {
//           return res.status(401).json({ message: "User not logged in, please log-in to use the service." });
//       }
//       if(!length) {
//           return res.status(400).json({ message: "Please provide a length" });
//       }
//       if(length < 6) {
//           return res.status(422).json({ message: "Password is weak, would you like to have a strong password" });
//       }
//       const password = passwordGenerator(length, options);
//       if(!password) {
//           return res.status(400).json({ message: "Please provide a valid length" });
//       }
//       res.status(200)
//            .json({success:true,
//            message: "Password generated: " ,
//            password: password });

//   } catch (error) {
//       console.log(
//         "Error occured while generating the password: ",
//         error.message,
//         " At: ",
//         error.title
//       );
//       res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       });
//   }
// };

export { savePassword, getPassword, deletePassword, updatePassword };

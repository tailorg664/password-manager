import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { // e.g., "Gmail", "Facebook"
    type: String,
    required: true,
  },
  url: { // e.g., "https://mail.google.com"
    type: String,
    required: true,
    match: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/\w-]*)*\/?$/, // optional URL validation
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });
const Password= mongoose.model("Password", passwordSchema);

export default Password
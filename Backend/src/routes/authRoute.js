import { signUp,deleteAccount,logout } from "../controllers/authController.js";
import express from "express";
import {authentuicateToken} from "../middleware/connection.js";
const router = express.Router();
router.route("/signup").post(signUp);
router.route("/deleteAccount").delete(deleteAccount);
router.route("/logout").post(authentuicateToken,logout)




export default router;
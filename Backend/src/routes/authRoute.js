import {signUp, deleteAccount, logout, checkAuth, login} from "../controllers/authController.js";
import express from "express";
import authenticateToken from "../middleware/connection.js";
const router = express.Router();
router.route("/signup").post(signUp);
router.route("/login").post(login)
router.route("/deleteAccount").delete(deleteAccount);
router.route("/logout").post(authenticateToken,logout)
router.route("/check").get(authenticateToken,checkAuth)




export default router;
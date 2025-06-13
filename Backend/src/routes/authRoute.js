import {signUp, deleteAccount, logout, checkAuth, login} from "../controllers/authController.js";
import express from "express";
import {protect} from "../middleware/connection.js";
const router = express.Router();
router.route("/signup").post(signUp);
router.route("/login").post(login)
router.route("/deleteAccount").delete(deleteAccount);
router.route("/logout").post(protect,logout)
router.route("/check").get(protect,checkAuth)
export default router;
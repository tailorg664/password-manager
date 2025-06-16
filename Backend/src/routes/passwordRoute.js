import express from "express";
import {protect} from "../middleware/connection.js";
import {getPassword,generatePassword, savePassword} from "../controllers/passwordController.js";
const router= express.Router()
router.route('/save-password').post(protect,savePassword)
router.route('/generate-password').post(protect,generatePassword)
router.route('/show-password').get(protect,getPassword)

export default  router
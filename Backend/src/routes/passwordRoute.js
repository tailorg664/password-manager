import express from "express";
import {protect} from "../middleware/connection.js";
import {getPassword,generatePassword} from "../controllers/passwordController.js";
const router= express.Router()

router.route('/generate').post(protect,generatePassword)
router.route('/show-password').get(protect,getPassword)

export default  router
import express from "express";
import {protect} from "../middleware/connection.js";
import {getPassword, savePassword,deletePassword,updatePassword} from "../controllers/passwordController.js";
const router= express.Router()
router.route('/save-password').post(protect,savePassword)
// router.route('/generate-password').post(protect,generatePassword)
router.route('/show-password').get(protect,getPassword)
router.route('/delete-password/:id').delete(protect,deletePassword)
router.route('/update-password/:id').put(protect,updatePassword)

export default  router
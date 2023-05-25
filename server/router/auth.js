import express from "express";
import * as authController from "../controller/auth.js"
import { isAuth } from "../middleware/auth.js";
import * as culture from '../controller/culture.js';

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/findid', authController.findId);

router.post('/findpw', authController.findPw);

router.get('/me', isAuth, authController.me);


router.put('/mypage', authController.C_updateMypage)
router.delete('/mypage', authController.deleteById)


export default router;
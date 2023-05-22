import express from "express";
// import * as authController from "../controller/auth.js";
import * as mainController from '../controller/main.js'
import { noLoginme } from '../controller/main.js'
import { isAuth } from "../middleware/auth.js";
import * as mainAuth from '../controller/auth.js'

const router = express.Router();

// 메인페이지
router.get('/', noLoginme, mainController.getAll);
router.post('/')



// router.get('/map');

// router.get('/culture');

// router.get('/me', isAuth, authController.me);

export default router;
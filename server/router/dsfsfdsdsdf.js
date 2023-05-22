import express from "express";
import * as authController from "../controller/auth.js";
import * as mainController from './`'
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.get('/', mainController.getAll);

// router.get('/map');

// router.get('/culture');

// router.get('/me', isAuth, authController.me);

export default router;
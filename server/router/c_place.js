import express from 'express';
import * as culture from '../controller/culture.js';
// import { body } from 'express-validator';
// import { validate } from "../middleware/validator.js";
// import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// const validateCulture = [
//     body('culture_content')
//         .trim()
//         .isLength({min : 4})
//         .withMessage('text는 최소 4글자 이상 입력하세요!'),
//     validate
// ];

// GET
router.get('/', culture.getPlaces);

// GET
router.get('/:place_NUM', culture.getPlace);
router.get('/:fac_name', culture.getPlaceByFac_name);

// POST
router.post('/', culture.CreatePlace);

// PUT
router.put('/:place_NUM', culture.UpdatePlace);

// DELETE
router.delete('/:place_NUM', culture.deletePlace);

export default router;

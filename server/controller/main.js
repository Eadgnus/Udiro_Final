import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as placeRepository from "../data/places/place.js";
import { config } from "../config.js";
// import db from '../db/database.js'

export async function getAll(req, res, next) {
    const result = await placeRepository.getAll()
    return res.status(200).json(result);
}



// export async function me(req, res, next) {
//     const user = await (userRepository.searchByIdx(req.user_idx));
//     if (!user) {
//         return res.status(404).json({ message: "사용자가 존재하지 않습니다." })
//     }
//     res.status(200).json({ token: req.token, user_id: user.user_id });
// }


export async function noLoginme(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401), next();
    }
    const decoded = verify(token);
    if (!decoded || !decoded.user_id) {
        return res.status(401).json({ message: '유효한 로그인정보가 아닙니다. failed.' }), next();
    }
    const user = await userRepository.searchByIdx(decoded.user_id);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' }), next();
    }
    res.status(200).json({ token: token, user_id: user.user_id });
}

// export async function search(req, res, next) {
//     const category = req.body.category
//     const keyword = req.body.keyword

//     category
// }



function createJwtToken(idx) {
    return jwt.sign({ idx }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}


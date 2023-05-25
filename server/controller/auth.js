import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepository from "../data/user/user.js";
import { config } from "../config.js";

export async function signup(req, res, next) {
    const { user_name, user_id, user_pw, user_email, user_phone, user_area } = req.body;

    try {
        const hashed = await (bcrypt.hash(user_pw, config.bcrypt.saltRound));
        const userId = await (userRepository.createUser({
            user_name,
            user_id,
            user_pw: hashed,
            user_email,
            user_phone,
            user_area
        }));
        console.log(userId);
        const token = createJwtToken(userId);
        res.status(201).json({ token, user_id });
    } catch (e) {
        console.log('아이디가 중복되었습니다.')
        next();
    }
}

export async function login(req, res) {
    const { user_id, user_pw } = req.body;
    const user = await (userRepository.searchById(user_id));

    if (!user) {
        return res.status(401).json({ message: "아이디 또는 비밀번호를 확인하세요" })
    }
    const isValidpassword = await (bcrypt.compare(user_pw, user.user_pw));
    if (!isValidpassword) {
        return res.status(401).json({ message: "아이디 또는 비밀번호를 확인하세요" })
    }
    const token = createJwtToken(user.user_idx);
    res.status(200).json({ token, user_id });
}

export async function findId(req, res, next) {
    const { user_name, user_phone } = req.body;
    const user = await (userRepository.searchByNameHP(user_name, user_phone));
    if (!user) {
        return res.status(404).json({ message: "사용자가 존재하지 않습니다." })
    }
    res.status(200).json({ token: req.token, user_id: user.user_id });
}

// export async function deleteById(req, res, next) {
//     const { user_id } = req.body;
//     const user = await (userRepository.searchById(user_id));
//     if (!user) {
//         return res.status(404).json({ message: "사용자가 존재하지 않습니다." })
//     }
//     res.status(200).json({ token: req.token, user_id: user.user_id });
// }

// DELETE
export async function deleteById(req, res, next) {
    const id = req.body.user_id; // req.body.id 와 req.params.id 의 차이점 확인
    // console.log(id) 아이디 넘어오는거 확인됨

    const user = await userRepository.searchById(id);

    if (!user) {
        return res.status(404).json({ message: `유저 id(${id}) is not found` });
    }

    // if (user.user_id !== id) {
    //   return res.status(403).json({ message: '본인확인 먼저해!' });
    // }

    await userRepository.deleteUser(id); // deleteUser -> deleteById로 변경
    res.sendStatus(204);
};



export async function findPw(req, res, next) {
    const { user_id, user_phone } = req.body;
    const user = await (userRepository.searchByIdHP(user_id, user_phone));
    if (!user) {
        return res.status(404).json({ message: "사용자가 존재하지 않습니다." })
    }
    const token = createJwtToken(user.user_idx);
    res.status(200).json({ token, user_id: user.user_id });
}

export async function updatePw(req, res, next) {

    const user = await (userRepository.searchByIdHP(user_id, user_phone));
    if (!user) {
        return res.status(404).json({ message: "사용자가 존재하지 않습니다." })
    }

    res.status(200).json({ token: req.token, user_id: user.user_id });
}


// export async function updateMypage(req, res, next) {
//     const { user_id, user_phone, user_email, user_area } = req.body;
//     const user = await userRepository.searchByIdHP(user_id, user_phone);
//     if (!user) {
//         return res.status(404).json({ message: "사용자가 존재하지 않습니다." })
//     }
//     //  수정해주기
//     const updated = await userRepository.updateMypage(user_id, user_phone, user_email, user_area)


//     res.status(200).json({ token: req.token, updated });
// }
export async function C_updateMypage(req, res, next) {
    try {
        const { user_id, user_phone, user_email, user_area } = req.body;
        const user = await userRepository.searchById(user_id);
        if (!user) {
            throw new Error('사용자가 존재하지 않습니다.')
        }
        user.user_id = user_id
        user.user_phone = user_phone;
        user.user_email = user_email;
        user.user_area = user_area;
        const updatedUser = await user.save();

        res.status(200).json()
        return updatedUser
    } catch (err) {
        console.error('DB 업데이트 중 오류가 발생하였습니다.', err);
        return res.status(500).send('오류야')
    }
}






export async function me(req, res, next) {
    const user = await (userRepository.searchByIdx(req.user_idx));
    if (!user) {
        return res.status(404).json({ message: "사용자가 존재하지 않습니다." })
    }
    res.status(200).json({ token: req.token, user_id: user.user_id });
}





function createJwtToken(idx) {
    return jwt.sign({ idx }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
}
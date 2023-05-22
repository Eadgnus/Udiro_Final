import SQ from "sequelize";
import {sequelize} from "../../db/database.js";
const DataTypes = SQ.DataTypes;

// 기존의 테이블이 없으면 테이블을 생성하고, 있으면 생성하지 않음
// 뒤에 s가 붙음
export const User = sequelize.define(
    "user",
    {
        // 인덱스
        user_idx:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        // 이름
        user_name:{
            type:DataTypes.STRING(128),
            allowNull:false
        },
        // 아이디
        user_id:{
            type:DataTypes.STRING(128),
            allowNull:false,
            unique: true
        },
        // 비밀번호
        user_pw:{
            type:DataTypes.STRING(128),
            allowNull:false
        },
        // 이메일
        user_email:{
            type:DataTypes.STRING(128),
            allowNull:false,
            unique: true
        },
        // 핸드폰번호
        user_phone:{
            type:DataTypes.STRING(128),
            allowNull:false,
            unique: true
        },
        // 자주가는 장소
        user_area:{
            type:DataTypes.STRING(128)
        },
        // 회원 스테이터스
        user_status:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 0
        }
    },
    {timestamps: false} // true면 createdAt, updatedAt 컬럼이 자동으로 생김
);
// user_idx user_name user_id user_pw user_email user_phone user_area

export async function createUser(user) {
    return User.create(user).then((data)=>data.dataValues.user_idx);
}

export async function searchById(user_id) {
    return User.findOne({where: {user_id}});
}

export async function searchByIdx(user_idx) {
    return User.findByPk(user_idx);
}

export async function searchByNameHP(user_name, user_phone) {
    return User.findOne({where: {user_name, user_phone}});
}

export async function searchByIdHP(user_id, user_phone) {
    return User.findOne({where: {user_id, user_phone}});
}
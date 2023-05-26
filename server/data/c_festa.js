// import { db } from '../db/database.js';
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import axios from 'axios';
import mariadb from 'mariadb'

const key = '4263715953616e7733346674745448';

const DataTypes = SQ.DataTypes;

// 수정
export const culture_festa = sequelize.define(
    'culture_festa',
    {
        festa_NUM: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        CODENAME: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        GUNAME: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        TITLE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        DATE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        PLACE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ORG_NAME: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        USE_TRGT: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        USE_FEE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        PLAYER: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        PROGRAM: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ETC_DESC: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ORG_LINK: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        MAIN_IMG: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        RGSTDATE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        TICKET: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        STRTDATE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        END_DATE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        THEMECODE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);
await sequelize.sync();

const fff = `http://openapi.seoul.go.kr:8088/4263715953616e7733346674745448/json/culturalEventInfo/1/1000/`;
const sss = `http://openapi.seoul.go.kr:8088/4263715953616e7733346674745448/json/culturalEventInfo/1001/2000/`;
const ddd = `http://openapi.seoul.go.kr:8088/4263715953616e7733346674745448/json/culturalEventInfo/2001/3000/`;
const vvv = `http://openapi.seoul.go.kr:8088/4263715953616e7733346674745448/json/culturalEventInfo/3000/3473/`;
async function fetchCultureFestas(url) {
    try {
        const response = await axios.get(url);
        const jsonDatas = response.data?.culturalEventInfo?.row || [];
        return jsonDatas;
    } catch (error) {
        console.error(
            'Culture Festas 데이터를 가져오는 중 오류가 발생했습니다:',
            error
        );
        return [];
    }
}

async function saveCultureFestas(jsonDatas) {
    try {
        for (const jsonData of jsonDatas) {
            await culture_festa.create(jsonData);
        }
        console.log('Culture Festas 저장이 완료되었습니다.');
    } catch (error) {
        console.error('Culture Festas 저장 중 오류가 발생했습니다:', error);
    }
}

async function saveAllCultureFestas() {
    try {
        const urls = [fff, sss, ddd, vvv];
        let allJsonDatas = [];

        for (const url of urls) {
            const jsonDatas = await fetchCultureFestas(url);

            // 중복 데이터 필터링
            for (const jsonData of jsonDatas) {
                const existingData = await culture_festa.findOne({
                    // 중복 확인을 위한 필드(식별자)를 사용하여 조회
                    // 예: FAC_ID를 기준으로 중복 확인
                    FAC_ID: jsonData.FAC_ID,
                });

                if (!existingData) {
                    allJsonDatas.push(jsonData);
                }
            }
        }

        await saveCultureFestas(allJsonDatas);
    } catch (error) {
        console.error('Culture Festas 저장 중 오류가 발생했습니다:', error);
    }
}

// 실행
saveAllCultureFestas();

const ORDER_DESC = {
    order: [['festa_NUM', 'DESC']],
};

export async function getAll() {
    return culture_festa.findAll({ ...ORDER_DESC });
}

// 수정 -> 필터 포함 시 날짜, 지역, 카테고리로 검색이므로 3가지가 필요
export async function getAllByData(username) {
    return culture_festa.findAll({
        ...ORDER_DESC,
        where: {
            username
        }
    });
}

export async function getAllByGuname(GUNAME) {
    return culture_festa.findAll({
        ...ORDER_DESC,
        where: {
            GUNAME,
        },
    });
}

export async function getAllByTitle(title) {
    return culture_festa.findAll({
        ...ORDER_DESC,
        where: {
            title,
        },
    });
}

export async function getAllBy(username) {
    return culture_festa.findAll({
        ...ORDER_DESC,
        where: {
            username
        }
    });
}

// 바꿀려면 변수 값만 수정하면 됩니다
export async function getByPK(festa_NUM) {
    return culture_festa.findByPk(festa_NUM);
}

// 변수 값만 수정하면 됩니다
export async function create(CODENAME) {
    return culture_festa.create({ CODENAME }).then((data) => {
        return data;
    });
}

// 찾는 방법 : festa_NUM , 바꿀 내용 : GUNAME -> 변수 값만 수정하면 됩니다
export async function update(festa_NUM, GUNAME) {
    return culture_festa.findByPk(festa_NUM).then((data) => {
        data.GUNAME = GUNAME;
        return data.save();
    });
}

// 수정
export async function remove(festa_NUM) {
    return culture_festa.findByPk(festa_NUM).then((data) => {
        data.destroy();
    });
}



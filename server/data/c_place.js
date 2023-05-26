// import { db } from '../db/database.js';
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import axios from 'axios';

const key = '5749585764616e773731474678446c';
const fff = `http://openapi.seoul.go.kr:8088/5749585764616e773731474678446c/json/culturalSpaceInfo/1/823/`;

const DataTypes = SQ.DataTypes;

export const culture_place = sequelize.define(
    'culture_place',
    {
        place_NUM: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        NUM: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        SUBJCODE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        FAC_NAME: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ADDR: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        X_COORD: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Y_COORD: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        PHNE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        FAX: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        HOMEPAGE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        OPENHOUR: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ENTR_FEE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        CLOSEDAY: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        OPEN_DAY: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        SEAT_CNT: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        MAIN_IMG: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ETC_DESC: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        FAC_DESC: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ENTRFREE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        SUBWAY: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        BUSSTOP: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        YELLOW: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        GREEN: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        BLUE: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        RED: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        AIRPORT: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { timestamps: false }
);
await sequelize.sync();

const stripHtmlTags = (htmlString) => {
    const regex = /(<([^>]+)>|&lt;|&gt;|&nbsp;)/gi;
    return htmlString.replace(regex, '');
};

const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

async function fetchCulturePlaces() {
    try {
        const response = await axios.get(fff);
        const jsonDatas = response.data?.culturalSpaceInfo?.row || [];
        return jsonDatas;
    } catch (error) {
        console.error(
            'Culture Places 데이터를 가져오는 중 오류가 발생했습니다:',
            error
        );
        return [];
    }
}

async function saveCulturePlaces() {
    try {
        const jsonDatas = await fetchCulturePlaces();
        let newJsonDatas = [];

        for (const jsonData of jsonDatas) {
            const existingData = await culture_place.findOne({
                FAC_ID: jsonData.FAC_ID,
            });

            if (!existingData) {
                jsonData.FAC_DESC = stripHtmlTags(jsonData.FAC_DESC); // HTML 태그 및 엔티티 제거
                jsonData.ETC_DESC = shortenText(jsonData.ETC_DESC, 1000); // 긴 데이터를 1000자로 줄임
                newJsonDatas.push(jsonData);
            }
        }

        if (newJsonDatas.length > 0) {
            for (const newData of newJsonDatas) {
                await culture_place.create(newData);
            }
            console.log(`Culture Places ${newJsonDatas.length}개를 저장하였습니다.`);
        } else {
            console.log('이미 데이터가 존재하여 저장할 필요가 없습니다.');
        }
    } catch (error) {
        console.error('Culture Places 저장 중 오류가 발생했습니다:', error);
    }
}

// 실행
saveCulturePlaces();

// 수정
const ORDER_DESC = {
    order: [['place_NUM', 'DESC']],
};

export async function getAll() {
    return culture_place.findAll({ ...ORDER_DESC });
}

// 수정 -> 필터 포함 시 날짜, 지역, 카테고리로 검색이므로 3가지가 필요
export async function getAllByLocation(username) {
    return culture_place.findAll({
        ...ORDER_DESC,
        where: {
            username,
        },
    });
}

export async function getAllByFac_name(fac_name) {
    return culture_place.findAll({
        ...ORDER_DESC,
        where: {
            fac_name,
        },
    });
}

export async function getAllByNum(NUM) {
    return culture_place.findAll({
        ...ORDER_DESC,
        where: {
            NUM,
        },
    });
}

export async function getAllByCategory(subjcode) {
    return culture_place.findAll({
        ...ORDER_DESC,
        where: {
            subjcode,
        },
    });
}

export async function getAllByTitle(fac_name) {
    return culture_place.findAll({
        ...ORDER_DESC,
        where: {
            fac_name,
        },
    });
}

// 바꿀려면 변수 값만 수정하면 됩니다
export async function getByPK(place_NUM) {
    return culture_place.findByPk(place_NUM);
}

// 변수 값만 수정하면 됩니다
export async function create(AIRPORT) {
    return culture_place.create({ AIRPORT }).then((data) => {
        return data;
    });
}

// 찾는 방법 : place_NUM , 바꿀 내용 : AIRPORT -> 변수 값만 수정하면 됩니다
export async function update(place_NUM, AIRPORT) {
    return culture_place.findByPk(place_NUM).then((data) => {
        data.AIRPORT = AIRPORT;
        return data.save();
    });
}

// 수정
export async function remove(place_NUM) {
    return culture_place.findByPk(place_NUM).then((data) => {
        data.destroy();
    });
}

import request from 'request'
import convert from 'xml-js';
import mysql from 'mysql2/promise';







const place = ['남산공원', '강남 MICE 관광특구', '동대문 관광특구', '명동 관광특구', '이태원 관광특구', '잠실 관광특구', '종로·청계 관광특구', '홍대 관광특구', '경복궁·서촌마을', '광화문·덕수궁', '창덕궁·종묘', '가산디지털단지역', '강남역', '건대입구역', '고속터미널역', '교대역', '구로디지털단지역', '서울역', '선릉역', '신도림역', '신림역', '신촌·이대역', '역삼역', '연신내역', '용산역', '왕십리역', 'DMC(디지털미디어시티)', '창동 신경제 중심지', '노량진', '낙산공원·이화마을', '북촌한옥마을', '가로수길', '성수카페거리', '수유리 먹자골목', '쌍문동 맛집거리', '압구정로데오거리', '여의도', '영등포 타임스퀘어', '인사동·익선동', '국립중앙박물관·용산가족공원', '뚝섬한강공원', '망원한강공원', '반포한강공원', '북서울꿈의숲', '서울대공원', '서울숲공원', '월드컵공원', '이촌한강공원', '잠실종합운동장', '잠실한강공원']


const key = '4d66634f6a776c7436315456716566'
const fff = `http://openapi.seoul.go.kr:8088/4d66634f6a776c7436315456716566/xml/citydata/1/5/광화문·덕수궁`;
const url = `http://openapi.seoul.go.kr:8088/${key}/xml/citydata/1/5/광화문·덕수궁`;


const fetchData = (placeNow) => {

    const encodedUrl = `http://openapi.seoul.go.kr:8088/${encodeURIComponent(key)}/xml/citydata/1/5/${encodeURIComponent(placeNow)}`;

    const options = {
        compact: true,
        ignoreAttributes: true,
        ignoreComment: true,
        spaces: 4,
        strict: false, // 추가
    };

    return new Promise((resolve, reject) => {
        request(encodedUrl, function (error, response, body) {
            // parse 보다 먼저 변수 선언하고 초기화
            let jsonData = {};
            jsonData = JSON.parse(convert.xml2json(body, options));

            let AREA_CONGEST_LVL = jsonData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_CONGEST_LVL']['_text']
            let AREA_PPLTN_MAX = jsonData['SeoulRtd.citydata']['CITYDATA']['LIVE_PPLTN_STTS']['LIVE_PPLTN_STTS']['AREA_PPLTN_MAX']['_text']

            resolve({
                PLACE: placeNow,
                AREA_CONGEST_LVL: AREA_CONGEST_LVL,
                AREA_PPLTN_MAX: AREA_PPLTN_MAX
            });
        });
    });
}

(async function () {
    try {
        const data = await Promise.all(place.map(fetchData));
        console.log(data)
        //  db 연결후 테이블 생성
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'udiro'
        });

        await connection.query(`
  CREATE TABLE IF NOT EXISTS places (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    congest_level varchar(25) NOT NULL,
    max_population INT NOT NULL,
    PRIMARY KEY (id)
  );
`);
        data.forEach(async (item) => {
            const INSERT_QUERY = `INSERT INTO places (name, congest_level, max_population) VALUES ('${item.PLACE}', '${item.AREA_CONGEST_LVL}', ${item.AREA_PPLTN_MAX})`;
            const UPDATE_QUERY = `UPDATE places SET congest_level = '${item.AREA_CONGEST_LVL}' WHERE name = '${item.PLACE}'`;

            // 같은 이름을 가진 데이터가 존재하는 지 체크합니다.
            const [existingData] = await connection.query(`SELECT id FROM places WHERE name = '${item.PLACE}'`);

            if (existingData && existingData.length > 0) {
                // 기존 데이터가 있으면 UPDATE문을 실행합니다.
                await connection.query(UPDATE_QUERY);
            } else {
                // 기존 데이터가 없으면 INSERT문을 실행합니다.
                await connection.query(INSERT_QUERY);
            }
        });
    } catch (e) {
        console.error(e);
    }
})();
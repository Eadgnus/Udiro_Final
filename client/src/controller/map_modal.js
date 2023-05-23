// ver2
// import request from 'request'
import convert from "C:|Users|de_cr|Desktop|Udiro현식이 붙기0523|Udiro_Final|client|node_modules|.bin|xml-js";


const place = ['남산공원', '강남 MICE 관광특구', '동대문 관광특구', '명동 관광특구', '이태원 관광특구', '잠실 관광특구', '종로·청계 관광특구', '홍대 관광특구', '경복궁·서촌마을', '광화문·덕수궁', '창덕궁·종묘', '가산디지털단지역', '강남역', '건대입구역', '고속터미널역', '교대역', '구로디지털단지역', '서울역', '선릉역', '신도림역', '신림역', '신촌·이대역', '역삼역', '연신내역', '용산역', '왕십리역', 'DMC(디지털미디어시티)', '창동 신경제 중심지', '노량진', '낙산공원·이화마을', '북촌한옥마을', '가로수길', '성수카페거리', '수유리 먹자골목', '쌍문동 맛집거리', '압구정로데오거리', '여의도', '영등포 타임스퀘어', '인사동·익선동', '국립중앙박물관·용산가족공원', '뚝섬한강공원', '망원한강공원', '반포한강공원', '북서울꿈의숲', '서울대공원', '서울숲공원', '월드컵공원', '이촌한강공원', '잠실종합운동장', '잠실한강공원']

const key = '4d66634f6a776c7436315456716566';

const options = {
    compact: false, // 배열 데이터도 json으로 파싱하도록 설정
    ignoreAttributes: true,
    ignoreComment: true,
    spaces: 4,
    // strict: false, // 추가
};
const weather_desc = document.querySelector('#weather_desc')



fetch(`http://openapi.seoul.go.kr:8088/${encodeURIComponent(key)}/xml/citydata/1/5/${encodeURIComponent('남산공원')}`)
    .then(response => response.text())
    .then(xmlData => {

        // 작은 모달창 인원 혼잡 부분
        const data = JSON.parse(convert.xml2json(xmlData, options))

        const placeName = data.elements[0].elements[2].elements[0].elements[0].text;
        const AREA_CONGEST_LVL = data.elements[0].elements[2].elements[1].elements[0].elements[0].elements[0].text;
        const AREA_CONGEST_MSG = data.elements[0].elements[2].elements[1].elements[0].elements[1].elements[0].text;
        const peopleNum = data.elements[0].elements[2].elements[1].elements[0].elements[3].elements[0].text;
        console.log(placeName)
        console.log(AREA_CONGEST_LVL)
        console.log(AREA_CONGEST_MSG)
        console.log(peopleNum)


        // 날씨
        // const weather = data.elements[0].elements[2].elements[8].elements[0]
        // const weather = data.elements[0].elements[2].elements[8].elements[0]
        const temp = data.elements[0].elements[2].elements[8].elements[0].elements[1].elements[0].text
        const MAX_TEMP = data.elements[0].elements[2].elements[8].elements[0].elements[3].elements[0].text
        const MIN_TEMP = data.elements[0].elements[2].elements[8].elements[0].elements[4].elements[0].text
        const HUMIDITY = data.elements[0].elements[2].elements[8].elements[0].elements[5].elements[0].text
        const WIND_SPD = data.elements[0].elements[2].elements[8].elements[0].elements[7].elements[0].text
        const rain = data.elements[0].elements[2].elements[8].elements[0].elements[9].elements[0].text
        // console.log(weather)
        console.log(temp)
        console.log(MAX_TEMP)
        console.log(MIN_TEMP)
        console.log(HUMIDITY)
        console.log(WIND_SPD)
        console.log(rain)
        weather_desc.innerHTML = rain
    })
    .catch(e => console.log(e))


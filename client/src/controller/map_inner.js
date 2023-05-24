// 이부분으로 사용
const search_bar = document.querySelector('#search-bar')

search_bar.addEventListener('change', (e) => {
    const place = e.target.value;
    console.log(place)


    const url = `http://openapi.seoul.go.kr:8088/4d66634f6a776c7436315456716566/xml/citydata/1/5/${place}`;

    fetch(url)
        .then(response => response.text())
        .then(data => {

            // modal창 id 셀렉해오기
            const weather_desc = document.querySelector('#weather_desc')
            const road_desc = document.querySelector('#road_desc')
            const people_desc = document.querySelector('#people_desc')
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            // console.log(xmlDoc);
            // XML을 파싱하여 원하는 데이터 추출
            const items = xmlDoc.getElementsByTagName("CITYDATA");



            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const weather = item.getElementsByTagName("WEATHER_STTS");
                const road = item.getElementsByTagName("ROAD_TRAFFIC_STTS");
                const people = item.getElementsByTagName("LIVE_PPLTN_STTS");


                // 파싱
                const weather_temp = weather[0].getElementsByTagName('TEMP')[0].textContent
                const ROAD_TRAFFIC_STTS = road[0].getElementsByTagName('ROAD_TRAFFIC_IDX')[0].textContent
                const LIVE_PPLTN_STTS = people[0].getElementsByTagName('AREA_CONGEST_LVL')[0].textContent

                // 간단히 보기에 넣기
                weather_desc.innerHTML = weather_temp
                road_desc.innerHTML = ROAD_TRAFFIC_STTS
                people_desc.innerHTML = LIVE_PPLTN_STTS


                // 자세히 보기 div가져오기

                // 날씨 입력
                const wt_des = document.querySelector('#wt_des')
                const wt_rain = document.querySelector('#wt_rain')
                const wt_rain_des = document.querySelector('#wt_rain_des')

                // 파싱한 값들
                /*
                        MAX_TEMP 최고온도
                        MIN_TEMP 최저온도
                        HUMIDITY 습도
                        PRECIPITATION 강수량
                        RAIN_CHANCE 강수확률
                        PCP_MSG 강수관련 메세지
                 */
                // 1번 div
                const MAX_TEMP = weather[0].getElementsByTagName('MAX_TEMP')[0].textContent
                const MIN_TEMP = weather[0].getElementsByTagName('MIN_TEMP')[0].textContent

                // 2번 div
                const HUMIDITY = weather[0].getElementsByTagName('HUMIDITY')[0].textContent
                const PRECIPITATION = weather[0].getElementsByTagName('PRECIPITATION')[0].textContent
                const RAIN_CHANCE = weather[0].getElementsByTagName('RAIN_CHANCE')[0].textContent

                // 3번째 줄 div
                const PCP_MSG = weather[0].getElementsByTagName('PCP_MSG')[0].textContent

                // 날씨에 넣기
                // 1번
                wt_des.innerHTML = `${MIN_TEMP}º/${MAX_TEMP}º`
                // 2번
                wt_rain.innerHTML = `${HUMIDITY}%, ${PRECIPITATION}, ${RAIN_CHANCE}%`
                // 3번
                wt_rain_des.innerHTML = PCP_MSG


                // 인구 혼잡도 시작
                const live_people = document.querySelector('#live_people')
                const live_msg = document.querySelector('#live_msg')
                const live_tb = document.querySelector('#live_tb')




                // 파싱
                const AREA_CONGEST_LVL = people[0].getElementsByTagName('AREA_CONGEST_LVL')[0].textContent

                const AREA_CONGEST_MSG = people[0].getElementsByTagName('AREA_CONGEST_MSG')[0].textContent

                const AREA_PPLTN_MAX = people[0].getElementsByTagName('AREA_PPLTN_MAX')[0].textContent
                const NON_RESNT_PPLTN_RATE = people[0].getElementsByTagName('NON_RESNT_PPLTN_RATE')[0].textContent

                //  값 대입하기
                live_people.innerHTML = AREA_CONGEST_LVL
                live_msg.innerHTML = AREA_CONGEST_MSG
                live_tb.innerHTML = `${AREA_PPLTN_MAX}명 / ${NON_RESNT_PPLTN_RATE}%`



                // 도로상황 시작
                const road_Traffic = document.querySelector('#road_Traffic')
                const road_msg = document.querySelector('#road_msg')
                const road_spd = document.querySelector('#road_spd')


                // 파싱
                // 도로 혼잡도는 이미 있음
                // const ROAD_TRAFFIC_STTS = road[0].getElementsByTagName('ROAD_TRAFFIC_STTS')[0].textContent
                const ROAD_MSG = road[0].getElementsByTagName('ROAD_MSG')[0].textContent
                const ROAD_TRAFFIC_SPD = road[0].getElementsByTagName('ROAD_TRAFFIC_SPD')[0].textContent

                road_Traffic.innerHTML = ROAD_TRAFFIC_STTS
                road_msg.innerHTML = ROAD_MSG
                road_spd.innerHTML = ROAD_TRAFFIC_SPD + 'K/m'

            }
        })
        .catch(error => {
            console.log("데이터를 가져오는 도중 오류가 발생했습니다.", error);
        })
})

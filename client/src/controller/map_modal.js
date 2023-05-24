const search_bar = document.querySelector('#search-bar')

search_bar.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue)
})

const url = "http://openapi.seoul.go.kr:8088/4d66634f6a776c7436315456716566/xml/citydata/1/5/남산공원";

fetch(url)
    .then(response => response.text())
    .then(data => {
        const weather_desc = document.querySelector('#weather_desc')
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        console.log(xmlDoc);
        // XML을 파싱하여 원하는 데이터 추출
        const items = xmlDoc.getElementsByTagName("CITYDATA");

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const name = item.getElementsByTagName("AREA_NM")[0].textContent;
            console.log("이름:", name);
            weather_desc.innerHTML = name
        }
    })
    .catch(error => {
        console.log("데이터를 가져오는 도중 오류가 발생했습니다.", error);
    });
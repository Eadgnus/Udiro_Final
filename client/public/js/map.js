
/* map 에서 search 버튼 */
const searchButton = document.querySelector('#search-button');
const searchBar = document.querySelector('#search-bar');

searchButton.addEventListener('click', () => {
    searchBar.classList.toggle('active');
});

/* map 에서 see 버튼 */
// 체크박스를 생성하는 함수
const seeButton = document.querySelector('.see-button');
const seecheckbox = document.querySelectorAll('.seecheckbox');

seeButton.addEventListener('click', () => {
    seecheckbox.forEach(checkBox => {
        checkBox.classList.toggle('active');
    });
});

// HTML 코드에서 select 요소를 선택합니다.
var selectElement = document.getElementById('search-bar');

// select 요소의 값이 변경되었을 때 실행되는 함수를 정의합니다.
selectElement.addEventListener('change', function () {
    // 선택된 option 요소의 값을 가져옵니다.
    var selectedValue = selectElement.value;

    // 선택된 값을 기반으로 구글 지도를 확대 및 이동시킵니다.
    // 예를 들어, 'namSan' 값에 대한 좌표를 지정하고 10배로 확대하는 경우:
    var coordinates;
    var zoomLevel = 15;




    if (selectedValue === 'namSan') {
        coordinates = { lat: 37.5553490645076806, lng: 127.0038041556261135 }; // 남산공원 좌표
    } else if (selectedValue === 'gangnamMICE') {
        coordinates = { lat: 37.495985, lng: 127.066409 }; // 강남 MICE 관광특구 좌표
    } else if (selectedValue === 'dongdaemun') {
        coordinates = { lat: 37.565685, lng: 127.007716 }; // 동대문 관광특구 좌표
    } else if (selectedValue === 'myeongDong') {
        coordinates = { lat: 37.559868, lng: 126.986149 }; // 명동 관광특구 좌표
    } else if (selectedValue === 'bongeunsa') {
        coordinates = { lat: 37.509435, lng: 127.057639 }; // 봉은사 좌표
    }
    // 구글 지도를 선택된 좌표로 확대 및 이동합니다.
    if (coordinates) {
        // 구글 맵 API를 사용하여 지도 객체를 가져옵니다.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: zoomLevel
        });

        // 마커를 생성합니다.
        var marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            title: 'Selected Location' // 마커에 표시될 제목
        });
    }
});




// 각각 클래스 이름으로 태그 다큐먼트로 가져오기
// const modals = document.querySelectorAll('.modal');
// const btnOpenPopup = document.querySelector('.btn-open-popup');
// const onClose = document.querySelectorAll('.close');
// const seeMore = document.querySelectorAll('.see__more');

// // 클릭했을때 반응하기 위해서 변수 선언해두기 
// const weather_click = document.getElementById('weather_click')
// const road_click = document.getElementById('road_click')
// const person_click = document.getElementById('person_click')
// const checkbox = document.getElementsByClassName('seecheckbox-container')

// // 보여줄부분(display=block으로 바꿀부분) 간단한정보 작은 모달창 3개
// const weather_More = document.querySelector('.modal2');
// const road_More = document.querySelector('.modal3');
// const person_More = document.querySelector('.modal4');


// // 닫기
// onClose.forEach(closeButton => {
//     closeButton.addEventListener('click', () => {
//         weather_More.classList.remove('show');
//         road_More.classList.remove('show');
//         person_More.classList.remove('show');
//     });
// });


// 토글로 모달창 html 클래스에 show css 클래스 를 추가하여  display block으로 만들어주기
// function showModal(modal) {
//     modal.classList.toggle('show');
// }

// show 빼주기
// function hideModal(modal) {
//     modal.classList.toggle('show');
// }


// 클릭했을때 modals에 저장되어있는 모든것들에 show 클래스 추가해주기
// btnOpenPopup.addEventListener('click', () => {
//     modals.forEach(modal => showModal(modal));
// });


// 날씨 모달창에 쇼 추가
// weather_click.addEventListener('click', () => {
//     showModal(weather_More)
// });

// 도로 모달창에 쇼 추가
// road_click.addEventListener('click', () => {
//     showModal(road_More)
// });

// 인구혼잡 모달창에 쇼 추가
// person_click.addEventListener('click', () => {
//     showModal(person_More)
// });


var markers = [];
// 체크박스 상태에 따라 마커를 보이게 하거나 숨기는 함수
function toggleMarkerVisibility(type) {
    var checkbox = document.getElementById(type + 'Checkbox');
    var isVisible = checkbox.checked;

    // 해당 타입의 마커들
    markers.forEach(function (marker) {
        if (marker.type === type) {
            marker.setVisible(isVisible);
        }
    });
}



function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {
            lat: 37.5665,
            lng: 126.9780
        },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,


    });

    fetch('http://openAPI.seoul.go.kr:8088/4550596c7365687731323346776b5a6f/xml/SearchPublicToiletPOIService/1/200/')
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, 'text/xml');

            var rows = xmlDoc.getElementsByTagName('row');
            var restrooms = [];
            for (var i = 0; i < rows.length; i++) {
                var restroom = {
                    name: rows[i].getElementsByTagName('FNAME')[0].textContent,
                    lat: parseFloat(rows[i].getElementsByTagName('Y_WGS84')[0].textContent),
                    lng: parseFloat(rows[i].getElementsByTagName('X_WGS84')[0].textContent)
                };
                restrooms.push(restroom);
            }

            restrooms.forEach(function (restroom) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: restroom.lat,
                        lng: restroom.lng
                    },
                    map: map,
                    title: restroom.name,
                    type: 'restroom',
                    visible: document.getElementById('restroomCheckbox').checked
                });
                markers.push(marker);
            });
        })
        .catch(error => {
            console.error('API 데이터를 가져오는 중 오류 발생:', error);
        });

    fetch('http://openapi.seoul.go.kr:8088/4550596c7365687731323346776b5a6f/xml/GetParkInfo/1/100/')
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, 'text/xml');

            var rows = xmlDoc.getElementsByTagName('row');
            var parkingLots = [];
            for (var i = 0; i < rows.length; i++) {
                var parkingLot = {
                    name: rows[i].getElementsByTagName('PARKING_NAME')[0].textContent,
                    lat: parseFloat(rows[i].getElementsByTagName('LAT')[0].textContent),
                    lng: parseFloat(rows[i].getElementsByTagName('LNG')[0].textContent)
                };
                parkingLots.push(parkingLot);
            }

            parkingLots.forEach(function (parkingLot) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: parkingLot.lat,
                        lng: parkingLot.lng
                    },
                    map: map,
                    title: parkingLot.name,
                    type: 'parking',
                    visible: document.getElementById('parkingCheckbox').checked
                });
                markers.push(marker);
            });
        })
        .catch(error => {
            console.error('지하주차장 데이터를 가져오는 중 오류 발생:', error);
        });
}
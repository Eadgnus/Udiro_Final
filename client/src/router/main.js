// import { response } from "express";

function peopelNum() {
    fetch('http://localhost:8080/', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    const token = data.token;
                    // window.location.href = '../main/index.html'; // 로그인 성공 시 index.html로 리디렉션
                    const peopleNum = document.getElementById('peopleNum')

                    data.forEach((i, index) => {
                        // if (i['congest_level'] == '여유') {
                        //     peopelNum.classList('')
                        // }
                        setTimeout(() => {
                            peopleNum.innerHTML = `${i['name']} ${i['max_population']}명`;
                            console.log(i);
                        }, 3000 * index);
                    });



                });
                // window.location.href = '../main/index.html'; // 로그인 성공 시 index.html로 리디렉션
            } else {
                response.json().then(function (data) {
                    alert('로그인 실패: ' + data.message); // 로그인 실패 시 알림 표시
                });
            }
        })
        .catch(function (error) {
            console.error(error);
            alert('로그인 요청에 실패했습니다.'); // 로그인 요청 실패 시 알림 표시
        });
}


const searchForm = document.querySelector('#search__form');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // 검색 요청 정보 가져오기
    const category = document.querySelector('#search__filter').value;
    const keyword = document.querySelector('#search__bar').value;

    // 검색 요청 보내기
    fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category, keyword })
    })
        .then(function (response) {
            if (response.ok) {
                // 검색 결과 화면으로 이동
                window.location.href = '../search/result.html';
            } else {
                response.json().then(function (data) {
                    console.log('검색 요청 실패: ' + data.message); // 검색 요청 실패 시 알림 표시
                });
            }
        })
        .catch(function (error) {
            console.error(error);
            console.log('검색 요청에 실패했습니다.'); // 검색 요청 실패 시 알림 표시
        });

});
peopelNum()
// searchMap()
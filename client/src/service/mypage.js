
function mypageUpdate() {
    fetch('https://port-0-udiroserver-7e6o2cli3ac97a.sel4.cloudtype.app/client/mypage/mypage', {
        method: 'PUT',
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
                    // 버튼 엘리먼트 선택하기
                    const prevBtn = document.querySelector(".slide_prev_button");
                    const nextBtn = document.querySelector(".slide_next_button");
                    data.forEach((i, index) => {
                        // if (i['congest_level'] == '여유') {
                        //     peopelNum.classList('')
                        // }
                        setTimeout(() => {
                            peopleNum.innerHTML = `${i['name']} ${i['max_population']}명`;
                        }, 3000 * index);
                    });



                });
                // window.location.href = '../main/index.html'; // 로그인 성공 시 index.html로 리디렉션
            } else {
                response.json().then(function (data) {
                    // alert('로그인 실패: ' + data.message); // 로그인 실패 시 알림 표시
                });
            }
        })
        .catch(function (error) {
            console.error(error);
            // alert('로그인 요청에 실패했습니다.'); // 로그인 요청 실패 시 알림 표시
        });
}

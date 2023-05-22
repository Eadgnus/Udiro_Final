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

peopelNum()
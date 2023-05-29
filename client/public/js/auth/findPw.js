function validation() {
    const user_id = document.getElementById("user_id").value;
    const user_phone = document.getElementById("phoneinput").value;

    const data = {
        user_id,
        user_phone
    };

    fetch('https://port-0-udiroserver-7e6o2cli3ac97a.sel4.cloudtype.app/auth/findpw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            if (response.ok) {
                if (document.getElementById("authentication")) {
                    document.getElementById("authentication").readOnly = false;
                }
                alert('')
            }
            else {
                response.json().then(function (data) {
                    alert("아이디 또는 휴대폰 번호를 확인해주세요"); // 로그인 실패 시 알림 표시
                });
            }
        })
        .catch(function (error) {
            console.error(error);
            alert('아이디 또는 휴대폰 번호를 확인해주세요'); // 로그인 요청 실패 시 알림 표시
        });
}


function sendit() {
    const user_id = document.getElementById('userid').value;
    const user_pw = document.getElementById('userpw').value;
    const user_name = document.getElementById('username').value;
    const user_phone = document.getElementById('hp').value;
    const user_email = document.getElementById('email').value;
    const data = {
        user_id,
        user_pw,
        user_name,
        user_phone,
        user_email
    };

    fetch('https://port-0-udiroserver-7e6o2cli3ac97a.sel4.cloudtype.app/auth/signup', {
        // fetch('https://port-0-udiroserver-7e6o2cli3ac97a.sel4.cloudtype.app/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    const token = data.token;
                    console.log(token);
                    localStorage.setItem("token", token);
                    window.location.href = '../main/index.html'; // 로그인 성공 시 index.html로 리디렉션
                });
            } else {
                response.json().then(function (data) {
                    alert('로그인 실패: ' + data.message); // 로그인 실패 시 알림 표시
                });
            }
        })
        .catch(function (error) {
            console.error(error);
            alert('로그인 요청에 실패했습니다.'); // 로그인 요청 실패 시 알림 표시
            console.log(data)
        });
}
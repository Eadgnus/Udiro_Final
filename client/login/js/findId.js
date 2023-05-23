function validation() {
    const user_name = document.getElementById("user_name").value;
    const user_phone = document.getElementById("user_phone").value;

    const data = {
        user_name,
        user_phone
    };

    fetch('http://localhost:8080/auth/findid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                document.getElementById("authentication").readOnly = false;
            });
        } 
        else {
            response.json().then(function(data) {
            alert("이름 또는 휴대폰 번호를 확인해주세요"); // 로그인 실패 시 알림 표시
            });
        }
    })
    .catch(function(error) {
        console.error(error);
        alert('이름 또는 휴대폰 번호를 확인해주세요'); // 로그인 요청 실패 시 알림 표시
    });
}


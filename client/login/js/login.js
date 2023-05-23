// const TokenStorage = require('../token/token.js');
// const tokenStorage = new TokenStorage();

function login() {
    const user_id = document.getElementById('idinput').value;
    const user_pw = document.getElementById('pwinput').value;
    const data = {
        user_id,
        user_pw
    };
  
  fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          const token = data.token;
          console.log(token);
          localStorage.setItem("token", token);
          window.location.href = '../main/index.html'; // 로그인 성공 시 index.html로 리디렉션
        });
      } else {
        response.json().then(function(data) {
          alert('로그인 실패: ' + data.message); // 로그인 실패 시 알림 표시
        });
      }
    })
    .catch(function(error) {
      console.error(error);
      alert('로그인 요청에 실패했습니다.'); // 로그인 요청 실패 시 알림 표시
    });
}
  
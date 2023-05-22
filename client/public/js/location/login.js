const logoContainer = document.querySelector('#logoContainer');
const findId = document.querySelector('#findId');
const findPw = document.querySelector('#findPw');
const signUp = document.querySelector('#signUp');






// 로고 클릭 메인
logoContainer.addEventListener('click', () => {
    window.location.href = '../../main/index.html';
})

// 아이디찾기
findId.addEventListener('click', () => {
    window.location.href = './findId.html';
})

// 비번찾기
findPw.addEventListener('click', () => {
    window.location.href = './findPw.html';
})

// 회원가입
signUp.addEventListener('click', () => {
    window.location.href = './signUp.html';
})


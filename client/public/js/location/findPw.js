const logoContainer = document.querySelector('#logoContainer');
const findId = document.querySelector('#findId');
const signUp = document.querySelector('#signUp');
const findPwRe = document.querySelector('#findPwRe');






// 로고 클릭 메인
logoContainer.addEventListener('click', () => {
    window.location.href = '../../main/index.html';
})

// 비번찾기
findId.addEventListener('click', () => {
    window.location.href = './findId.html';
})

// 회원가입
signUp.addEventListener('click', () => {
    window.location.href = './terms.html';
})
findPwRe.addEventListener('click', () => {
    window.location.href = './newPW.html';
})


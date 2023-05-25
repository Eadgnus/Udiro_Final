// function editNickname() {
//     var nicknameText = document.getElementById("nickname");
//     var currentNickname = nicknameText.innerText.trim();
//     var nicknameInput = document.createElement("input");
//     nicknameInput.type = "text";
//     nicknameInput.value = currentNickname;

//     // Replace the nickname text with an input element
//     nicknameText.innerText = "";
//     nicknameText.appendChild(nicknameInput);

//     // Change the button text to "저장" (Save)
//     var nicknameBtn = document.getElementById("nickname__update__btn");
//     nicknameBtn.innerText = "저장";

//     // Add click event to the "저장" (Save) button
//     nicknameBtn.onclick = function () {
//         var newNickname = nicknameInput.value;
//         // Perform the save/update logic here
//         // For this example, we simply update the nickname text
//         nicknameText.innerText = newNickname;
//         // Change the button text back to "편집" (Edit)
//         nicknameBtn.innerText = "편집";
//         // Reset the button click event to editNickname()
//         nicknameBtn.onclick = editNickname;
//     };
// }

// 수정할 곳들의 내용을 객체에 담아서 한번에 보내주기
const user_id = document.querySelector('#my__Acount__id__text').children[1].textContent.trim(' ')
const user_email = document.querySelector('#my__Acount__email__text').children[1].textContent.trim(' ')
const user_phone = document.querySelector('#my__Acount__phone__text').children[1].textContent.trim(' ')
const user_area = document.querySelector('#my__Acount__favorite__area__text').children[1].textContent.trim(' ')



function editemail() {
    var emailText = document.getElementById("email");
    var currentemail = emailText.innerText.trim();
    var emailInput = document.createElement("input");
    emailInput.type = "text";
    emailInput.value = currentemail;

    emailText.innerText = "";
    emailText.appendChild(emailInput);

    var emailBtn = document.getElementById("email__update__btn");
    emailBtn.innerText = "저장";

    emailBtn.onclick = async function () {
        const newemail = emailInput.value;
        emailText.innerText = newemail;
        emailBtn.innerText = "편집";
        emailBtn.onclick = editemail;
        confirm('수정하시겠습니까?')

        // 서버 통신부분
        try {
            const response = await fetch('http://localhost:8080/mypage/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    user_phone: user_phone,
                    user_email: newemail,
                    user_area: user_area
                }) // 업데이트할 사용자 정보
            });

            if (response.ok) {
                console.log('User email updated successfully');
            } else {

                console.error('Error updating user email');
            }
        } catch (error) {
            console.error('Error updating user email', error);
        }
    };
}

function editphonenumber() {
    var phonenumberText = document.getElementById("phonenumber");
    var currentphonenumber = phonenumberText.innerText.trim();
    var phonenumberInput = document.createElement("input");
    phonenumberInput.type = "text";
    phonenumberInput.value = currentphonenumber;

    phonenumberText.innerText = "";
    phonenumberText.appendChild(phonenumberInput);

    var phonenumberBtn = document.getElementById("email__phone__btn");
    phonenumberBtn.innerText = "저장";


    // 서버 통신 부분
    phonenumberBtn.onclick = async function () {
        var newphonenumber = phonenumberInput.value;
        phonenumberText.innerText = newphonenumber;
        phonenumberBtn.innerText = "편집";
        phonenumberBtn.onclick = editphonenumber;
        confirm('수정하시겠습니까?')

        try {
            const response = await fetch('http://localhost:8080/mypage/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    user_phone: newphonenumber,
                    user_email: user_email,
                    user_area: user_area
                }) // 업데이트할 사용자 정보
            });

            if (response.ok) {
                alert('phone번호 수정완료');
            } else {

                alert('존재하지 않는 사용자입니다.')
            }
        } catch (error) {
            console.error('Error updating user', error);
        }
    };



}

function editusuallylocal() {
    var usuallylocalText = document.getElementById("usuallylocal");
    var currentusuallylocal = usuallylocalText.innerText.trim();
    var usuallylocalInput = document.createElement("input");
    usuallylocalInput.type = "text";
    usuallylocalInput.value = currentusuallylocal;

    usuallylocalText.innerText = "";
    usuallylocalText.appendChild(usuallylocalInput);

    var usuallylocalBtn = document.getElementById("favorite__area__btn");
    usuallylocalBtn.innerText = "저장";

    usuallylocalBtn.onclick = async function () {
        var newusuallylocal = usuallylocalInput.value;
        usuallylocalText.innerText = newusuallylocal;
        usuallylocalBtn.innerText = "편집";
        usuallylocalBtn.onclick = editusuallylocal;
        confirm('수정하시겠습니까?')

        try {
            const response = await fetch('http://localhost:8080/mypage/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user_id,
                    user_phone: user_phone,
                    user_email: user_email,
                    user_area: newusuallylocal
                }) // 업데이트할 사용자 정보
            });

            if (response.ok) {
                alert('자주가는 지역 수정완료');
            } else {

                alert('존재하지 않는 사용자입니다.')
            }
        } catch (error) {
            console.error('Error updating user', error);
        }
    };
}


// function editjjuim() {
//     var jjuimText = document.getElementById("jjuim");
//     var currentjjuim = jjuimText.innerText.trim();
//     var jjuimInput = document.createElement("input");
//     jjuimInput.type = "text";
//     jjuimInput.value = currentjjuim;

//     jjuimText.innerText = "";
//     jjuimText.appendChild(jjuimInput);

//     var jjuimBtn = document.getElementById("favorite__area__btn2");
//     jjuimBtn.innerText = "저장";

//     jjuimBtn.onclick = function () {
//         var newjjuim = jjuimInput.value;
//         jjuimText.innerText = newjjuim;
//         jjuimBtn.innerText = "편집";
//         jjuimBtn.onclick = editjjuim;
//     };
// }

function showConfirmation() {
    const confirmation = confirm('정말로 탈퇴하시겠습니까?');

    if (confirmation) {
        const deleteUser = prompt('정말로 탈퇴하시길 원하면 "탈퇴" 를 입력해주세요.')
        if (deleteUser == "탈퇴") {
            deleteData();
        }
    }
}
async function deleteData() {
    try {
        const response = await fetch('http://localhost:8080/mypage/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user_id,
                user_phone: user_phone,
                user_email: user_email,
                user_area: user_area
            }) // 업데이트할 사용자 정보
        });

        if (response.ok) {
            alert('탈퇴가 완료 되었습니다.');
        } else {

            alert('존재하지 않는 사용자입니다.')
        }
    } catch (error) {
        console.error('Error updating user', error);
    }
};

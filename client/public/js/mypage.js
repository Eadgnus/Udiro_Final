// name__text
// nickname__text
// email__text
// phone__text
// pw__text
// pw__text2
// favorite__text
// #jjuim

var emailValue = document.querySelector("#email__value")
var emailText = document.createElement("input");
emailText.type = "text";
emailText.value = emailValue;
document.querySelector("#email__value")
document.querySelector("#email__value")

var saveBtn = document.createElement("button");
saveBtn.id = "email__save__btn";
saveBtn.classList.add("mypage__btn");
saveBtn.textContent = "저장";
document.querySelector("#my__Acount__email__update").appendChild(saveBtn);

document.querySelector("#email__update__btn").disabled = true;

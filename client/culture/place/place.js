const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const placenum = urlParams.get('placeId');

function fetchDataPlace(placenum) {
    fetch(`http://localhost:8080/place/${placenum}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            processDataPlace(data);
        })
        .catch((error) => {
            console.error('에러 발생', error);
        });
}

function processDataPlace(data) {
    // 데이터 처리
    const placesContainer = document.querySelector('.txt-box');
    const imgContainer = document.querySelector('.img-box');
    const textContainer = document.querySelector('.moreview');

    const text = `${data.FAC_DESC}`;
    const img = `<img src="${data.MAIN_IMG}" style="background-size: cover;">`;
    const html = `
    <div class="event-title2">
        <h2>${data.FAC_NAME}</h2>
    </div>
    <div class="type-box2">
        <ul>
            <li>
                <div class="type-th">
                    <span>주소</span>
                </div>
                <div class="type-td">
                    <span>${data.ADDR}</span>
                </div>
            </li>
            <li>
                <div class="type-th">
                    <span>휴관일</span>
                </div>
                <div class="type-td">
                    <span>${data.CLOSEDAY}</span>
                </div>
            </li>
            <li>
                <div class="type-th">
                    <span>요금</span>
                </div>
                <div class="type-td">
                    <span>${data.ENTRFREE}</span>
                </div>
            </li>
            <li>
                <div class="type-th">
                    <span>문의</span>
                </div>
                <div class="type-td">
                    <span>${data.PHNE}</span>
                </div>
            </li>
            <li>
                <div class="type-th">
                    <span>종류</span>
                </div>
                <div class="type-td">
                    <span>${data.SUBJCODE}</span>
                </div>
            </li>
            <li>
                <div class="type-th">
                    <span>홈페이지</span>
                </div>
                <div class="type-td">
                    <div class="detail-btn">
                        <span><a href="${data.HOMEPAGE}" target="_blank">홈페이지
                                바로가기</a></span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
`;

    placesContainer.innerHTML = html;
    imgContainer.innerHTML = img;
    textContainer.innerHTML = text;
}

fetchDataPlace(placenum);

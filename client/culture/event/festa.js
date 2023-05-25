const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const festanum = urlParams.get('festivalId');

function fetchDataFesta(festanum) {
    fetch(`http://localhost:8080/festa/${festanum}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            processDataFesta(data);
        })
        .catch((error) => {
            console.error('에러 발생', error);
        });
}

function processDataFesta(data) {
    // 데이터 처리
    const festasContainer = document.querySelector('.txt-box');
    const imgContainer = document.querySelector('.img-box');
    // const textContainer = document.querySelector('.moreview');

    const text = `${data.PROGRAM}`;
    const img = `<img src="${data.MAIN_IMG}" style="background-size: cover;">`;
    const html = `
    <div class="event-title2">
    <h2>${data.TITLE}</h2>
    </div>
    <div class="type-box2">
        <ul>
            <li>
                <div class="type-th">
                    <span>주소</span>
                </div>
                <div class="type-td">
                    <span>${data.PLACE}</span>
                </div>
            </li>
            <li>
                <div class="type-th">
                    <span>공연기간</span>
                </div>
                <div class="type-td">
                    <span>${data.DATE}</span>
                </div>
            </li>
            <li>
                <div class="type-th">
                    <span>요금</span>
                </div>
                <div class="type-td">
                    <span>${data.USE_FEE}</span>
                </div>
            </li>
            <li>
                <div class="type-th">
                    <span>종류</span>
                </div>
                <div class="type-td">
                    <span>${data.CODENAME}</span>
                </div>
            </li>
            <li>
                <div class="type-th">
                    <span>제한</span>
                </div>
                <div class="type-td">
                    <span>${data.USE_TRGT}</span>
                </div>
            </li>
            <li>
                <div class="type-th">
                    <span>종류</span>
                </div>
                <div class="type-td">
                    <span>${data.CODENAME}</span>
                </div>
            </li>
            <li>
                <div class="type-th">
                    <span>홈페이지</span>
                </div>
                <div class="type-td">
                    <div class="detail-btn">
                        <span><a href="${data.ORG_LINK}" target="_blank">홈페이지
                                바로가기</a></span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
`;

    festasContainer.innerHTML = html;
    imgContainer.innerHTML = img;
    // textContainer.innerHTML = text;
}

fetchDataFesta(festanum);

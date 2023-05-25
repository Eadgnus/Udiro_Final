const key = '5749585764616e773731474678446c';
const fff = `http://openapi.seoul.go.kr:8088/5749585764616e773731474678446c/json/culturalSpaceInfo/1/823/`;
const url = `http://openapi.seoul.go.kr:8088/${key}/json/culturalSpaceInfo/1/823/`;

fetch(fff)
    .then((response) => response.json())
    .then((data) => {
        const culturalSpaces = data.culturalSpaceInfo.row;
        const nums = culturalSpaces.map((number) => number.NUM);
        const addresses = culturalSpaces.map((space) => space.ADDR);

        // 정규식 '~~구' 추출
        const districtRegex = /(\S+)(?=구)/;
        const districts = addresses.map((address) => {
            // '~~구' 추출, 없으면 null
            const match = address.match(districtRegex);
            return match ? `${match[1]}구` : null;
        });

        nums.forEach((numsElement, index) => {
            const district = districts[index];
            console.log(`${numsElement}:${district}`);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
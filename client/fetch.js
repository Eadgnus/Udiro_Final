import fetch from "node-fetch";

const url = "http://localhost:8080";

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));


fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
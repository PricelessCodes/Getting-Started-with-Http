// CREATE XML Http Request
const xhr = new XMLHttpRequest();
//CONFIQRATE REQUEST
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

//NOT ALL BROWSERS SUPPORT IT SO WE USE ONLOAD
//xhr.addEventListener();

//tell js that the response of type json to avoid parsing
xhr.responseType = 'json';

//CALLED WHEN REQUEST IS RESPONED
xhr.onload = function () {
    //xhr.response Return JSON data so we need to parse it
    // a better way than parsing is to use response type equal to json

    const listOfPosts = xhr.response;

    for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector("h2").textContent = post.title.toUpperCase();
        postEl.querySelector("p").textContent = post.body;
        listElement.append(postEl);
    }
}

//SEND REQUEST
xhr.send();

const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
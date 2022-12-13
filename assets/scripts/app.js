const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");

function sendHttpRequest(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        // CREATE XML Http Request
        const xhr = new XMLHttpRequest();
        //CONFIQRATE REQUEST
        xhr.open(method, url);

        //NOT ALL BROWSERS SUPPORT IT SO WE USE ONLOAD
        //xhr.addEventListener();

        //tell js that the response of type json to avoid parsing
        xhr.responseType = "json";

        //CALLED WHEN REQUEST IS RESPONED
        xhr.onload = function () {
            //xhr.response Return JSON data so we need to parse it
            // a better way than parsing is to use response type equal to json

            resolve(xhr.response);
        };

        //SEND REQUEST
        xhr.send(JSON.stringify(data));
    });

    return promise;
}

async function fetchPosts() {
    const responseData = await sendHttpRequest(
        "GET",
        "https://jsonplaceholder.typicode.com/posts"
    );

    const listOfPosts = responseData;

    for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector("h2").textContent = post.title.toUpperCase();
        postEl.querySelector("p").textContent = post.body;
        listElement.append(postEl);
    }
}

async function CreatePost(title, content) {
    const UserId = Math.random();
    const post = {
        title: title,
        body: content,
        userId: UserId,
    };
    sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

fetchButton.addEventListener("click", fetchPosts);
form.addEventListener("submit", event => {
    event.preventDefault();

    const enteredTitle = event.currentTarget.querySelector("#title").value;
    const enteredContent = event.currentTarget.querySelector("#content").value;

    CreatePost(enteredTitle, enteredContent);
});

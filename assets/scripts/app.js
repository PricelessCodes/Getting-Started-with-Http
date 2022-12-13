const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
    /*const promise = new Promise((resolve, reject) => {
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

            if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
            else
                reject(
                    new Error(
                        "Failed to send request, try agian later"
                    )
                );
        };

        xhr.onerror = function () {
            reject(
                new Error(
                    "Failed to send request, check ur internet connection"
                )
            );
        };

        //SEND REQUEST
        xhr.send(JSON.stringify(data));
    }); 

    return promise;*/

    //.json() parse response from json to js objects
    // and also turns  the streamed response body in response object into a snapshot
    return fetch(url).then(response => response.json());
}

async function fetchPosts() {
    try {
        const responseData = await sendHttpRequest(
            "GET",
            "https://jsonplaceholder.typicode.com/posts"
        );
    
        const listOfPosts = responseData;
    
        for (const post of listOfPosts) {
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector("h2").textContent = post.title.toUpperCase();
            postEl.querySelector("p").textContent = post.body;
            postEl.querySelector("li").id = post.id;
            listElement.append(postEl);
        }
    } catch (error) {
        alert(error.message);
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

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const enteredTitle = event.currentTarget.querySelector("#title").value;
    const enteredContent = event.currentTarget.querySelector("#content").value;

    CreatePost(enteredTitle, enteredContent);
});

postList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const post = event.target.closest("li");
        sendHttpRequest(
            "DELETE",
            `https://jsonplaceholder.typicode.com/posts/${post.id}`
        );
        postList.removeChild(post);
    }
});

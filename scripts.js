let threads = [];
let user = {
    firstname: "",
    lastname: "",
}

// $("document").ready(function() {
//     $.ajax({
//         url: "http://hyeumine.com/forumLogin.php",
//         method: "POST",
//         data: {firstname: "HUNYO", lastname: "KOJI"},
//         success: (data) => {
//             console.log(data);
//         }
//     });
// })

$("document").ready(function() {
    getForumPosts();
})

function getForumPosts() {
    $.ajax({
        url: "http://hyeumine.com/forumGetPosts.php",
        method: "GET",
        // data: {page: 0},
        success: (data) => {
            threads = JSON.parse(data);
            displayThreads();
            console.log(threads)
            displayPost();
        }
    });
}

function displayPost() {
    if (document.location.pathname === "/thread.html") {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const i = urlParams.get('index');
        let post = $("#thread");
        
        let thisPost = threads[i];
        post.empty();
        let newPost = $(`
        <li>
            <div>
                <p>${thisPost.post}</p>
            </div>
            <div>
                <p>${thisPost.user}</p>
                <p>${thisPost.date}</p>
            </div>
        </li>
        `);
        post.append(newPost);
        if ("reply" in thisPost) {
            thisPost.reply.forEach((r) => {
                let newPost = $(`
                <li>
                    <div>
                        <p>${r.reply}</p>
                    </div>
                    <div>
                        <p>${r.user}</p>
                        <p>${r.date}</p>
                    </div>
                </li>
                `);
                post.append(newPost);
            })
        }
    }
}

function displayThreads() {
    let postList = $("#threads");
    postList.empty();
    threads.forEach((p, i) => {
        let newPost = $(`
        <li>
            <div>
                <a href="thread.html?index=${i+1}">Thread ${i+1}</a>
            </div>
            <div>
                <p>${p.post}</p>
            </div>
            <div>
                <p>${p.user}</p>
                <p>${p.date}</p>
            </div>
        </li>
        `);
        postList.append(newPost);
    })
}
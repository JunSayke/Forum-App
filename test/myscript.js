let postList;
let username;
let userid;
 
$("document").ready(function() {
    console.log(localStorage.getItem("uid"))
    userid = localStorage.getItem("uid");
    if (userid !== null) {
        $("#login-form").remove()
        $("#register-form").remove()
    } else {
        $("#logout-btn").remove()
        $("#create-post-form").remove()
    }
 
    getForumPosts();
 
    $("#login-btn").click(() => {
        loginUser();
    })
 
    $("#register-btn").click(() => {
        createUser();
    })
 
    $("#post-btn").click(() => {
        createPost();
    })
 
    $("#logout-btn").click(() => {
        localStorage.removeItem("uid")
        document.location.reload()
    })
})
 
function getForumPosts() {
    $.ajax({
        url: "http://hyeumine.com/forumGetPosts.php",
        method: "GET",
        // data: {page: 0},
        success: (data) => {
            postList = JSON.parse(data).reverse();
            console.log(postList)
            displayPosts();
        }
    });
}
 
// function displayThread() {
//     if (document.location.pathname === "./thread.html") {
//         const queryString = window.location.search;
//         const urlParams = new URLSearchParams(queryString);
//         const i = urlParams.get('index');
//         let post = $("#thread");
       
//         let thisPost = threads[i];
//         post.empty();
//         let newPost = $(`
//         <li>
//             <div>
//                 <p>${thisPost.post}</p>
//             </div>
//             <div>
//                 <p>${thisPost.user}</p>
//                 <p>${thisPost.date}</p>
//             </div>
//         </li>
//         `);
//         post.append(newPost);
//         if ("reply" in thisPost) {
//             thisPost.reply.forEach((r) => {
//                 let newPost = $(`
//                 <li>
//                     <div>
//                         <p>${r.reply}</p>
//                     </div>
//                     <div>
//                         <p>${r.user}</p>
//                         <p>${r.date}</p>
//                     </div>
//                 </li>
//                 `);
//                 post.append(newPost);
//             })
//         }
//     }
// }
 
function displayPosts() {
    const threads = $("#thread-container");
    threads.empty();
    postList.forEach((p, i) => {
        const newPost = $(`<div class="list-group">
            <a class="list-group-item list-group-item-action">
                <div class="post-header d-flex w-100 justify-content-between">
                    <h6 class="mb-1"><span class="badge bg-primary rounded-pill">${("reply" in p ? p["reply"].length : 0)}</span> Thread ${i+1}
                    </h6>
                    <small class="text-muted">${p.date}</small>
                </div>
                <p class="mb-1">${p.post}</p>
                <small class="text-muted">${p.user}</small>
            </a>
        </div>`)
        const deleteBtn = $(`<button class="btn btn-danger">X</button>`);
        if (p.uid === userid) {
            deleteBtn.on("click", () => {
                deletePost(i);
            })
            newPost.find(".post-header").append(deleteBtn)
        }
        threads.append(newPost);
    })
}
 
function createUser() {
    const firstName = $("#register-first-name")
    const lastName = $("#register-last-name")
    username = firstName.val() + " " + lastName.val();
    console.log(username)
    $.ajax({
        url: "http://hyeumine.com/forumCreateUser.php",
        method: "POST",
        async: false,
        data: {username},
        success: (data) => {
            console.log(data);
            alert("TEST")
        }
    });
}
 
function loginUser() {
    const firstName = $("#login-first-name")
    const lastName = $("#login-last-name")
    username = firstName.val() + " " + lastName.val();
    console.log(username)
    $.ajax({
        url: "http://hyeumine.com/forumLogin.php",
        method: "POST",
        async: false,
        data: {username: "EREN JEAGER"},
        success: (data) => {
            data = JSON.parse(data);
            if (data.success) {
                localStorage.setItem("uid", data.user.id)
            }
            console.log(data);
            alert("TEST")
        },
    });
}
 
function createPost() {
    const post = $("#post-form")
    $.ajax({
        url: "http://hyeumine.com/forumNewPost.php",
        method: "POST",
        async: false,
        data: {id: userid, post: post.val()},
        success: (data) => {
            data = JSON.parse(data);
            console.log(data);
        },
    });
}
 
function deletePost(index) {
    $.ajax({
        url: "http://hyeumine.com/forumDeletePost.php",
        method: "GET",
        async: false,
        data: {id: postList[index].id},
        success: (data) => {
            data = JSON.parse(data);
        },
    });
}
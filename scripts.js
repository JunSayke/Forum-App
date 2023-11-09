// constant variables
const DOMAIN_NAME = "http://hyeumine.com"

// global variables
let g_postList, g_userId = localStorage.getItem("uid")

// main
$("document").ready(() => {
    const form = $("#auth-form")
    form.on("show.bs.modal", (event) => {
        const title = $(event.relatedTarget).attr("data-bs-whatever")
        const authTitle = form.find("#auth-title")
        const authBtn = form.find("#auth-btn")
        authTitle.text(title)
        authBtn.text(title)
    })

    getPosts(1)
    console.log(g_postList)
    // createUser("HUNYO", "SAYKE")
    // loginUser("HUNYO", "SAYKE")
    // newPost(userId, "AOT MASTERPIECE")
    // deletePost(10874)
    $("#auth-btn").click(() => {
        if ($("#auth-btn").text() === "Sign In") {
            loginUser( $("#first-name").val(), $("#last-name").val() )
        } else {
            createUser( $("#first-name").val(), $("#last-name").val() )
        }
        document.location.reload()
    })

    $("#post-btn").click(() => {
        newPost(g_userId, $("#post-content").val())
        document.location.reload()
    })
})













































































$.ajaxSetup({
    error: (jqXHR, textStatus, errorThrown) => {
        console.log(`${jqXHR} ${errorThrown}`);
        alert(textStatus);
    }
})

function ajaxRequest(path, method, data, callback, async = true) {
    const url = `${DOMAIN_NAME}${path}`;
    $.ajax({ url, method, async, data, success: callback });
}

function getPosts(page) {
    const path = "/forumGetPosts.php"
    const data = { page: page }
    const callback = data => {
        data = JSON.parse(data)
        g_postList = data;
    }

    ajaxRequest(path, "GET", data, callback, false)
    displayPost()
}

function displayPost() {
    $("#threads").empty();
    g_postList.forEach(p => {
        const POST_HTML = $(`<button class="list-group-item list-group-item-action border border-2 rounded px-4">
        <div class="post-header d-flex w-100 justify-content-between">
            <p class="mb-1 d-inline-block text-truncate" style="width: 150px;"><span class="post-replies badge bg-primary">0</span> <span class="post-content">Some placeholder content in a paragraph.</span></p>
            <small class="post-date text-muted">09/11/2023 11:52PM</small>
        </div>
        <small class="text-muted">Post by <span class="post-author">Eren Jeager</span></small>
        </button>`)

        POST_HTML.find(".post-content").text(p.post)
        POST_HTML.find(".post-replies").text(("reply" in p) ? p.reply.length : 0)
        POST_HTML.find(".post-date").text(p.date)
        POST_HTML.find(".post-author").text(p.user)

        const deleteBtn = $(`<button type="button" class="btn-close" aria-label="Close"></button>`);
        if (p.uid === g_userId) {
            console.log("YES")
            deleteBtn.on("click", () => {
                deletePost(p.id);
                document.location.reload()
            })
            POST_HTML.find(".post-header").append(deleteBtn)
        }

        POST_HTML.on("click", () => {
            
        })

        $("#threads").append(POST_HTML)
    });
}

function createUser(firstname, lastname) {
    const path = "/forumCreateUser.php"
    const data = { username: `${firstname} ${lastname}` }
    const callback = data => {
        data = JSON.parse(data)
        console.log(data)
        if (data.success) {
            g_userId = localStorage.setItem("uid", data.user.id)
        }
    }

    ajaxRequest(path, "POST", data, callback)
}

function loginUser(firstname, lastname) {
    const path = "/forumLogin.php"
    const data = { username: `${firstname} ${lastname}` }
    const callback = data => {
        data = JSON.parse(data)
        console.log(data)
        if (data.success) {
            g_userId = localStorage.setItem("uid", data.user.id)
        }
    }

    ajaxRequest(path, "POST", data, callback, false)
}

function newPost(userId, content) {
    const path = "/forumNewPost.php"
    const data = { id: userId, post: content }
    const callback = data => {
        console.log(JSON.parse(data))
    }

    ajaxRequest(path, "POST", data, callback, false)
}

function deletePost(postId) {
    const path = "/forumDeletePost.php"
    const data = { id: postId }
    const callback = data => {
        console.log(data)
    }

    ajaxRequest(path, "GET", data, callback, false)
}

function replyPost(userId, postId, content) {
    const path = "/forumReplyPost.php"
    const data = { uid: userId, id: postId, reply: content }
    const callback = data => {
        console.log(data)
    }

    ajaxRequest(path, "POST", data, callback)
}

function deleteReply(replyId) {
    const path = "/forumDeleteReply.php"
    const data = { id: replyId }
    const callback = data => {
        console.log(data)
    }

    ajaxRequest(path, "GET", data, callback)
}
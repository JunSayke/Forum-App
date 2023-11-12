const DOMAIN_NAME = "http://hyeumine.com";
const POST_HTML = `<button 
    type="button"
    class="list-group-item list-group-item-action"
    data-bs-toggle="modal"
    data-bs-target="#modal-form"
    data-bs-whatever="Forum Thread"
>
<div class="container-fluid d-flex gap-2">
    <div
        class="d-flex justify-content-center align-items-center me-2">
        <img
            src="topic_read_hot.png"
            style="width: 36px; height: 36px" />
    </div>
    <div
        class="container-fluid d-inline-block m-0 p-0 text-truncate"
        style="max-width: 50%">
        <h6 class="m-0 p-0">
            <span class="post-author">Eren Jeager</span>
        </h6>
        <small class="post-content text-muted"
            >Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla
            pariatur.</small
        >
    </div>
    <div
        class="container-fluid d-flex align-items-start justify-content-end">
        <div class="d-flex flex-column">
            <small
                class="post-date text-nowrap text-muted"
                >12/11/2023 5:01PM</small
            >
            <small class="text-nowrap text-muted"
                >Replies:
                <span
                    class="post-replies badge bg-danger rounded"
                    >0</span
                ></small
            >
        </div>
    </div>
    <input
        onclick="alert(1)"
        type="button"
        class="btn-close"
        style="font-size: small; visibility: hidden"
        aria-label="Close" />
</div>
</button>`;
const REPLY_HTML = `<hr><div
    class="container-fluid rounded d-flex gap-4 p-2 my-2">
    <div
        class="p-2 text-nowrap d-flex flex-column">
        <span>EREN JEAGER</span>
        <small class="text-muted"
            >12/11/2023 11:49PM</small
        >
    </div>
    <div
        class="p-4 border-start border-secondary">
        <div>
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis
            nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute
            irure dolor in reprehenderit in
            voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
        </div>
    </div>
</div><hr>`;
const MODAL_FORM = "#modal-form";
const THREADS = {};
const USER_ID = localStorage.getItem("uid");

$.ajaxSetup({
	error: (jqXHR, textStatus, errorThrown) => {
		console.log(`${jqXHR} ${errorThrown}`);
		alert(textStatus);
	},
});

function ajaxRequest(path, method, data, callback, async = true) {
	const url = `${DOMAIN_NAME}${path}`;
	$.ajax({ url, method, async, data, success: callback });
}

$("document").ready(() => {
	// createUser("HUNYO", "SAYKE")
	// loginUser("HUNYO", "SAYKE")
	// newPost(userId, "AOT MASTERPIECE")
	// deletePost(10874)
	createPagination(1, 5);
	$("#auth-btn").click(() => {
		if ($("#auth-btn").text() === "Sign In") {
			loginUser($("#first-name").val(), $("#last-name").val());
		} else {
			createUser($("#first-name").val(), $("#last-name").val());
		}
		document.location.reload();
	});

	$("#post-btn").click(() => {
		newPost(USER_ID, $("#post-content").val());
		document.location.reload();
	});

	$("#show-register-btn").click(() => {
		setRegisterModal();
	});

	$("#show-login-btn").click(() => {
		setLoginModal();
	});

	$("#new-topic-btn").click(() => {
		setTopicModal();
	});
});

function setThreadModal() {
	const modalHeader = $(`<h5 class="modal-title">
    <b>FORUM THREAD</b>
    </h5>
    <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close">
    </button>`);

	const modalBody = $(`<div class="container-fluid"></div>`);

	for (let i = 0; i < 5; i++) {
		modalBody.append(REPLY_HTML);
		console.log(i);
	}

	const modalFooter = $(`<form class="w-100">
        <div class="form-floating">
            <textarea
                id="reply-textarea"
                class="form-control"
                placeholder="Leave a comment here"
                style="height: 100px; resize: none"></textarea>
            <label for="post-content"
                >Post Content</label
            >
            <div
                class="container-fluid d-flex align-items-center justify-content-end py-2 px-0">
                <button
                    id="post-reply-btn"
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Reply
                </button>
            </div>
        </div>
    </form>`);
	setModal(modalHeader, modalBody, modalFooter, "modal-xl");
}

function setRegisterModal() {
	const modalHeader = $(`<h5>
    <b>REGISTER FORM</b>
    </h5>
    <button 
        type="button" 
        class="btn-close" 
        data-bs-dismiss="modal" 
        aria-label="Close">
    </button>`);
	const modalBody = $(`<form>
        <div class="form-floating py-2">
            <input class="form-control" id="first-name" placeholder="First Name">
            <label for="first-name">First Name</label>
        </div>
        <div class="form-floating py-2">
            <input class="form-control" id="last-name" placeholder="Last Name">
            <label for="last-name">Last Name</label>
        </div>
    </form>`);
	const modalFooter = $(`<button 
        id="login-btn" 
        type="button" 
        class="btn btn-primary w-100">
        Register
    </button>`);
	setModal(modalHeader, modalBody, modalFooter);
}

function setLoginModal() {
	const modalHeader = $(`<h5>
    <b>LOGIN FORM<b>
    </h5>
    <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close">
    </button>`);
	const modalBody = $(`<form>
        <div class="form-floating py-2">
            <input class="form-control" id="first-name" placeholder="First Name">
            <label for="first-name">First Name</label>
        </div>
        <div class="form-floating py-2">
            <input class="form-control" id="last-name" placeholder="Last Name">
            <label for="last-name">Last Name</label>
        </div>
    </form>`);
	const modalFooter = $(`<button 
        id="login-btn" 
        type="button" 
        class="btn btn-primary w-100">
        Login
    </button>`);
	setModal(modalHeader, modalBody, modalFooter);
}

function setTopicModal() {
	const modalHeader = $(`<h5>
        <b>NEW TOPIC<b>
        </h5>
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close">
        </button>`);
	const modalBody = $(`<form>
        <div class="form-floating">
            <textarea
                class="form-control"
                placeholder="Leave a comment here"
                id="post-content"
                style="
                    height: 100px;
                "></textarea>
            <label for="post-content"
                >Post Content</label
            >
        </div>
    </form>`);
	const modalFooter = $(`<button
        id="post-btn"
        type="button"
        class="btn btn-primary w-100">
        Create New Topic
    </button>`);
	setModal(modalHeader, modalBody, modalFooter, "modal-lg");
}

function setModal(modalHeader, modalBody, modalFooter, modalSize = "modal-sm") {
	$(MODAL_FORM).find(".modal-dialog").removeClass("modal-sm");
	$(MODAL_FORM).find(".modal-dialog").removeClass("modal-md");
	$(MODAL_FORM).find(".modal-dialog").removeClass("modal-lg");
	$(MODAL_FORM).find(".modal-dialog").removeClass("modal-xl");
	$(MODAL_FORM).find(".modal-dialog").addClass(modalSize);
	$(MODAL_FORM).find(`.modal-header`).html(modalHeader);
	$(MODAL_FORM).find(`.modal-body`).html(modalBody);
	$(MODAL_FORM).find(`.modal-footer`).html(modalFooter);
}

function createPagination(index, length) {
	const pagination = $("#pagination").find("ul.pagination");
	const previous = $("#pagination-previous");
	const next = $("#pagination-next");
	if (index < 1) {
		previous.prop("disabled", true);
		index = 1;
	}
	pagination.empty();
	previous.off("click").on("click", () => {
		createPagination(index - 2, 5);
		displayPosts(index - 1);
	});
	next.off("click").on("click", () => {
		createPagination(index + 2, 5);
		displayPosts(index + length);
	});

	pagination.off("click").on("click", ".page-link", function () {
		pagination.find(".page-item").removeClass("active");
		$(this).parent().addClass("active");
		const i = $(this).text();
		if (i - 1 < 1) {
			previous.prop("disabled", true);
		} else {
			previous.prop("disabled", false);
		}
		displayPosts(i);
	});

	for (let i = index; i < index + length; i++) {
		let posts = getPosts(i);
		console.log(posts);
		if (posts.length > 0) {
			const pageItem = $(`<li class="page-item">
            <button class="page-link">${i}</button>
            </li>`);
			pagination.append(pageItem);
		} else {
			next.prop("disabled", true);
			break;
		}
	}
}

function getPosts(page) {
	const path = "/forumGetPosts.php";
	const data = { page: page };
	let obj;
	const callback = (data) => {
		obj = JSON.parse(data);
	};

	ajaxRequest(path, "GET", data, callback, false);
	return obj;
}

function displayPosts(page) {
	$("#threads").empty();

	const posts = getPosts(page);
	posts.forEach((p) => {
		const html = $(POST_HTML);
		let blankAuthor = false;
		let blankContent = false;
		let postContent = html.find(".post-content");
		let postAuthor = html.find(".post-author");
		let postDate = html.find(".post-date");
		let postReplies = html.find(".post-replies");
		let replies = "reply" in p ? p.reply.length : 0;

		if (p.user.trim().length === 0) {
			blankAuthor = true;
		}
		if (p.post.trim().length === 0) {
			blankContent = true;
		}

		if (blankAuthor === true) {
			postAuthor.addClass("text-danger");
			p.user = "Unknown User";
		}

		if (blankContent === true) {
			postContent.removeClass("text-muted");
			postContent.addClass("text-danger");
			p.post = "unknown topic";
		}

		postContent.text(p.post);
		postAuthor.text(p.user);
		postDate.text(p.date);
		postReplies.text(replies);

		const deleteBtn = html.find("input");
		if (p.uid === USER_ID) {
			deleteBtn.on("click", () => {
				this.addClass;
				deletePost(p.id);
				document.location.reload();
			});
			deleteBtn.removeAttr("visibility");
		}

		html.on("click", () => {
			setThreadModal();
		});

		$("#threads").append(html);
	});
}

function createUser(firstname, lastname) {
	const path = "/forumCreateUser.php";
	const data = { username: `${firstname} ${lastname}` };
	const callback = (data) => {
		data = JSON.parse(data);
		console.log(data);
		if (data.success) {
			g_userId = localStorage.setItem("uid", data.user.id);
		}
	};

	ajaxRequest(path, "POST", data, callback);
}

function loginUser(firstname, lastname) {
	const path = "/forumLogin.php";
	const data = { username: `${firstname} ${lastname}` };
	const callback = (data) => {
		data = JSON.parse(data);
		console.log(data);
		if (data.success) {
			g_userId = localStorage.setItem("uid", data.user.id);
		}
	};

	ajaxRequest(path, "POST", data, callback, false);
}

function newPost(userId, content) {
	const path = "/forumNewPost.php";
	const data = { id: userId, post: content };
	const callback = (data) => {
		console.log(JSON.parse(data));
	};

	ajaxRequest(path, "POST", data, callback, false);
}

function deletePost(postId) {
	const path = "/forumDeletePost.php";
	const data = { id: postId };
	const callback = (data) => {
		console.log(data);
	};

	ajaxRequest(path, "GET", data, callback, false);
}

function replyPost(userId, postId, content) {
	const path = "/forumReplyPost.php";
	const data = { uid: userId, id: postId, reply: content };
	const callback = (data) => {
		console.log(data);
	};

	ajaxRequest(path, "POST", data, callback);
}

function deleteReply(replyId) {
	const path = "/forumDeleteReply.php";
	const data = { id: replyId };
	const callback = (data) => {
		console.log(data);
	};

	ajaxRequest(path, "GET", data, callback);
}

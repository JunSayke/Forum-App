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
		<h6 class="post-author m-0 p-0 text-truncate">
		</h6>
		<small class="post-content text-muted"></small>
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
        class="btn-close ms-auto"
        style="font-size: small; visibility: hidden"
        aria-label="Close" />
</div>
</button>`;
const REPLY_HTML = `<hr />
	<div class="container-fluid d-flex flex-column ">
		<div class="container-fluid d-flex p-2">
			<div class="d-flex justify-content-center align-items-center me-4">
				<img src="user_profile_icon.png" style="
						width: 36px;
						height: 36px;
					">
			</div>
			<div class="container-fluid d-inline-block m-0 p-0 text-truncate" style="max-width: 50%">
				<h6 class="post-author m-0 p-0 text-truncate"></h6>
				<small class="post-date text-muted"></small>
			</div>
		</div>
		<div class="container-fluid">
			<p class="post-content"></p>
		</div>
		<button class="btn btn-sm btn-outline-danger ms-auto">Delete</button>
	</div>
<hr />`;
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

function setThreadModal(thread) {
	const modalHeader = $(`<h5 class="modal-title">
    <b>FORUM THREAD</b>
    </h5>
    <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close">
    </button>`);
	const modalBody = $(`<div class="container-fluid px-5"></div>`);

	const post = $(REPLY_HTML);
	const postAuthor = post.find(".post-author");
	const postDate = post.find(".post-date");
	const postContent = post.find(".post-content");
	postAuthor.text(thread.user);
	postDate.text(thread.date);
	postContent.text(thread.post);
	modalBody.append(post);

	if ("reply" in thread) {
		thread.reply.forEach((r) => {
			const reply = $(REPLY_HTML);
			const replyAuthor = reply.find(".post-author");
			const replyDate = reply.find(".post-date");
			const replyContent = reply.find(".post-content");
			replyAuthor.text(r.user);
			replyDate.text(r.date);
			replyContent.text(r.reply);

			reply.appendTo(modalBody);
		});
	}

	const modalFooter = $(`<form class="w-100 mx-5">
		<div class="mb-3">
			<label
				for="reply-textarea"
				class="form-label"
				>Type your reply here:
			</label>
			<textarea
				class="form-control"
				id="reply-textarea"
				rows="3"
				style="
					height: 100px;
					resize: none;
				"></textarea>
		</div>
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
			<label
				for="post-textarea"
				class="form-label"
				>Type your topic content here:
			</label>
			<textarea
				class="form-control"
				id="post-textarea"
				rows="3"
				style="
					height: 100px;
					resize: none;
			"></textarea>
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
		const postAuthor = html.find(".post-author");
		const postDate = html.find(".post-date");
		const postContent = html.find(".post-content");
		const postReplies = html.find(".post-replies");
		const replies = "reply" in p ? p.reply.length : 0;

		if (p.user.trim().length === 0) {
			postAuthor.addClass("text-danger");
			p.user = "Unknown User";
		}
		if (p.post.trim().length === 0) {
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
			setThreadModal(p);
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

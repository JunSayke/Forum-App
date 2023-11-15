import * as HTML from "./src/scripts/html_bodies.js"
import * as HYEUMINE from "./src/scripts/api_requests.js"

const USER = {
	ID: localStorage.getItem("user_id"),
	NAME: localStorage.getItem("user_name"),
}
const CURRENT_PAGE = Number.isInteger(parseInt(localStorage.getItem("page")))
	? parseInt(localStorage.getItem("page"))
	: 1

$("document").ready(() => {
	createPagination(Math.floor((CURRENT_PAGE - 1) / 5) * 5 + 1, 5, CURRENT_PAGE)

	if (USER.ID) {
		const userProfile = $(HTML.PROFILE_DROPDOWN)
		userProfile.find("#profile-name").text(USER.NAME)
		userProfile.find("#logout-btn").on("click", () => {
			localStorage.removeItem("user_name")
			localStorage.removeItem("user_id")
			document.location.reload()
		})
		$(HTML.NAV_HEADER).append(userProfile)
	} else {
		const loginRegisterBtn = $(HTML.LOGIN_REGISTER_BUTTON)
		loginRegisterBtn.find("#show-register-btn").on("click", () => {
			setRegisterModal()
		})
		loginRegisterBtn.find("#show-login-btn").on("click", () => {
			setLoginModal()
		})
		$(HTML.NAV_HEADER).append(loginRegisterBtn)
	}

	$("#new-topic-btn").click(() => {
		setTopicModal()
	})
})

function setRegisterModal() {
	const modalHeader = $(HTML.MODAL_HEADER)
	const modalBody = $(HTML.REGISTER_MODAL_BODY)
	const modalFooter = $(HTML.MODAL_FOOTER_BUTTON)
	modalHeader.find(".modal-title").html("<b>REGISTER FORM</b>")
	modalFooter.text("Register")
	modalFooter.off("click").on("click", () => {
		HYEUMINE.createUser(
			modalBody.find("#first-name").val(),
			modalBody.find("#last-name").val()
		)
	})
	setModal(modalHeader, modalBody, modalFooter)
}

function setLoginModal() {
	const modalHeader = $(HTML.MODAL_HEADER)
	const modalBody = $(HTML.LOGIN_MODAL_BODY)
	const modalFooter = $(HTML.MODAL_FOOTER_BUTTON)
	modalHeader.find(".modal-title").html("<b>LOGIN FORM</b>")
	modalFooter.text("Login")
	modalFooter.off("click").on("click", () => {
		HYEUMINE.loginUser(
			modalBody.find("#first-name").val(),
			modalBody.find("#last-name").val()
		)
	})
	setModal(modalHeader, modalBody, modalFooter)
}

function setTopicModal() {
	const modalHeader = $(HTML.MODAL_HEADER)
	const modalBody = $(HTML.TOPIC_MODAL_BODY)
	const modalFooter = $(HTML.MODAL_FOOTER_BUTTON)

	modalHeader.find(".modal-title").html("NEW TOPIC")
	modalFooter.text("Create Topic")

	modalFooter.off("click").on("click", () => {
		HYEUMINE.newPost(USER.ID, modalBody.find("#post-textarea").val())
	})
	setModal(modalHeader, modalBody, modalFooter)
}

function setThreadModal(thread) {
	const modalHeader = $(HTML.MODAL_HEADER)
	const modalBody = $(HTML.THREAD_MODAL_BODY)
	const modalFooter = $(HTML.THREAD_MODAL_FOOTER)

	modalHeader.find(".modal-title").html("<b>FORUM THREAD</b>")

	const post = $(HTML.REPLY_HTML)
	const postAuthor = post.find(".post-author")
	const postContent = post.find(".post-content")

	if (thread.user.trim().length === 0) {
		postAuthor.addClass("text-danger")
		postAuthor.text("Unknown User")
	} else {
		postAuthor.text(thread.user)
	}
	if (thread.post.trim().length === 0) {
		postContent.removeClass("text-muted")
		postContent.addClass("text-danger")
		postContent.text("unknown topic")
	} else {
		postContent.text(thread.post)
	}

	post.find(".post-date").text(thread.date)
	post.addClass("border border-secondary rounded")

	modalBody.append(post)
	modalBody.append(`<p class="text-muted text-center my-4">Comments</p>`)

	if (thread.hasOwnProperty("reply")) {
		thread.reply.reverse()
		thread.reply.forEach((r) => {
			const reply = $(HTML.REPLY_HTML)
			const replyAuthor = reply.find(".post-author")
			const replyContent = reply.find(".post-content")

			if (r.user.trim().length === 0) {
				replyAuthor.addClass("text-danger")
				replyAuthor.text("Unknown User")
			} else {
				replyAuthor.text(r.user)
			}
			if (r.reply.trim().length === 0) {
				replyContent.removeClass("text-muted")
				replyContent.addClass("text-danger")
				replyContent.text("unknown topic")
			} else {
				replyContent.text(r.reply)
			}

			reply.find(".post-date").text(r.date)
			const deleteBtn = reply.find("button")

			if (r.uid === USER.ID) {
				deleteBtn.css("visibility", "")
				deleteBtn.off("click").on("click", () => {
					HYEUMINE.deleteReply(r.id)
					document.location.reload()
				})
			}

			modalBody.append("<hr />")
			reply.appendTo(modalBody)
		})
	}

	modalFooter.find("button").on("click", () => {
		HYEUMINE.replyPost(
			USER.ID,
			thread.id,
			modalFooter.find("#reply-textarea").val()
		)
	})

	setModal(modalHeader, modalBody, modalFooter, "modal-xl")
}

function setModal(modalHeader, modalBody, modalFooter, modalSize = "modal-md") {
	$(HTML.MODAL_FORM).find(".modal-dialog").removeClass("modal-sm")
	$(HTML.MODAL_FORM).find(".modal-dialog").removeClass("modal-md")
	$(HTML.MODAL_FORM).find(".modal-dialog").removeClass("modal-lg")
	$(HTML.MODAL_FORM).find(".modal-dialog").removeClass("modal-xl")
	$(HTML.MODAL_FORM).find(".modal-dialog").addClass(modalSize)

	$(HTML.MODAL_FORM).find(".modal-header").html(modalHeader)
	$(HTML.MODAL_FORM).find(".modal-body").html(modalBody)
	$(HTML.MODAL_FORM).find(".modal-footer").html(modalFooter)
}

function createPagination(index, length, selectedPage = 1) {
	const pagination = $("#pagination").find("ul.pagination").empty()
	const previous = $("#pagination-previous")
	const next = $("#pagination-next")

	localStorage.setItem("page", selectedPage)

	previous.parent().toggleClass("disabled", index <= 5)

	previous.off("click").on("click", () => {
		createPagination(index - 5, 5, index - 1)
	})

	next.off("click").on("click", () => {
		createPagination(index + length, 5, index + length)
	})

	for (let i = index; i < index + length; i++) {
		const page = HYEUMINE.getPosts(i)
		const pageLink = $(
			`<li class="page-item"><button class="page-link">${i}</button></li>`
		)

		if (i === selectedPage) {
			if (page.length > 0) {
				pageLink.addClass("active")
				displayPosts(selectedPage)
			} else if (i != 1) {
				createPagination(1, 5)
				return
			}
		}

		if (page.length > 0) {
			pageLink.on("click", () => {
				pagination.find(".page-item").removeClass("active")
				pageLink.addClass("active")
				localStorage.setItem("page", i)
				displayPosts(i)
			})
		}

		pageLink.toggleClass("disabled", page.length < 1)
		next.parent().toggleClass("disabled", page.length < 1)
		pageLink.appendTo(pagination)
	}
}

function displayPosts(page) {
	const threadsContainer = $("#threads")
	threadsContainer.empty()

	const posts = HYEUMINE.getPosts(page)

	posts.forEach((p) => {
		const html = $(HTML.POST_HTML)
		const postAuthor = html.find(".post-author")
		const postDate = html.find(".post-date")
		const postContent = html.find(".post-content")
		const postReplies = html.find(".post-replies")
		const deleteBtn = html.find("input")

		const replies = p.hasOwnProperty("reply") ? p.reply.length : 0

		if (p.user.trim().length === 0) {
			postAuthor.addClass("text-danger")
			postAuthor.text("Unknown User")
		} else {
			postAuthor.text(p.user)
		}
		if (p.post.trim().length === 0) {
			postContent.removeClass("text-muted")
			postContent.addClass("text-danger")
			postContent.text("unknown topic")
		} else {
			postContent.text(p.post)
		}

		postDate.text(p.date)
		postReplies.text(replies)

		if (p.uid === USER.ID) {
			deleteBtn.css("visibility", "")
			deleteBtn.off("click").on("click", () => {
				HYEUMINE.deletePost(p.id)
				document.location.reload()
			})
		}

		html.on("click", () => {
			setThreadModal(p)
		})

		threadsContainer.append(html)
	})
}

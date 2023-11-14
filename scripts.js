import * as HTML from "./src/scripts/html_bodies.js"
import * as HYEUMINE from "./src/scripts/api_requests.js"

const THREADS = {}
const USER_ID = localStorage.getItem("uid")
const CURRENT_PAGE = Number.isInteger(parseInt(localStorage.getItem("page")))
	? parseInt(localStorage.getItem("page"))
	: 1

$("document").ready(() => {
	createPagination(Math.floor((CURRENT_PAGE - 1) / 5) * 5 + 1, 5, CURRENT_PAGE)

	$("#show-register-btn").click(() => {
		setRegisterModal()
	})

	$("#show-login-btn").click(() => {
		setLoginModal()
	})

	$("#new-topic-btn").click(() => {
		setTopicModal()
	})
})

function setRegisterModal() {
	const modalHeader = $(HTML.MODAL_HEADER)
	const modalBody = $(HTML.REGISTER_MODAL_BODY)
	const modalFooter = $(HTML.MODAL_FOOTER_BUTTON)

	modalFooter.text("Register")
	modalFooter.on("click", () => {
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

	modalFooter.text("Login")
	modalFooter.on("click", () => {
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

	modalFooter.text("Create Topic")
	setModal(modalHeader, modalBody, modalFooter, "modal-lg")
}

function setThreadModal(thread) {
	const modalHeader = $(HTML.MODAL_HEADER)
	const modalBody = $(HTML.THREAD_MODAL_BODY)
	const modalFooter = $(HTML.THREAD_MODAL_FOOTER)
	const post = $(HTML.REPLY_HTML)

	post.find(".post-author").text(thread.user)
	post.find(".post-date").text(thread.date)
	post.find(".post-content").text(thread.post)

	modalHeader.find(".modal-title").html("<b>FORUM THREAD</b>")
	modalBody.append(post)

	if (thread.hasOwnProperty("reply")) {
		thread.reply.forEach((r) => {
			const reply = $(HTML.REPLY_HTML)
			const deleteBtn = reply.find("button")

			reply.find(".post-author").text(r.user)
			reply.find(".post-date").text(r.date)
			reply.find(".post-content").text(r.reply)

			if (r.uid === USER_ID) {
				deleteBtn.css("visibility", "")
				deleteBtn.off("click").on("click", () => {
					HYEUMINE.deleteReply(p.id)
					document.location.reload()
				})
			}

			reply.appendTo(modalBody)
		})
	}

	modalFooter.text("Reply")
	modalFooter.on("click", () => {})
	setModal(modalHeader, modalBody, modalFooter, "modal-xl")
}

function setModal(modalHeader, modalBody, modalFooter, modalSize = "modal-sm") {
	$(HTML.MODAL_FORM).find(".modal-dialog").removeClass("modal-sm")
	$(HTML.MODAL_FORM).find(".modal-dialog").removeClass("modal-md")
	$(HTML.MODAL_FORM).find(".modal-dialog").removeClass("modal-lg")
	$(HTML.MODAL_FORM).find(".modal-dialog").removeClass("modal-xl")
	$(HTML.MODAL_FORM).find(".modal-dialog").addClass(modalSize)

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
			p.user = "Unknown User"
		}
		if (p.post.trim().length === 0) {
			postContent.removeClass("text-muted")
			postContent.addClass("text-danger")
			p.post = "unknown topic"
		}

		postContent.text(p.post)
		postAuthor.text(p.user)
		postDate.text(p.date)
		postReplies.text(replies)

		if (p.uid === USER_ID) {
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

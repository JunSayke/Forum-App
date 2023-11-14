const DOMAIN_NAME = "http://hyeumine.com"

$.ajaxSetup({
	error: (jqXHR, textStatus, errorThrown) => {
		console.log(`${jqXHR} ${errorThrown}`)
		alert(textStatus)
	},
})

function ajaxRequest(path, method, data, callback, async = true) {
	const url = `${DOMAIN_NAME}${path}`
	$.ajax({ url, method, async, data, success: callback })
}

export function getPosts(page) {
	const path = "/forumGetPosts.php"
	const data = { page: page }
	let obj
	const callback = (data) => {
		obj = JSON.parse(data)
	}

	ajaxRequest(path, "GET", data, callback, false)
	return obj
}

export function createUser(firstname, lastname) {
	const path = "/forumCreateUser.php"
	const data = { username: `${firstname} ${lastname}` }
	let obj
	const callback = (data) => {
		obj = JSON.parse(data)
		if (data.success) {
			obj = data.user.id
		}
	}

	ajaxRequest(path, "POST", data, callback)
	return obj
}

export function loginUser(firstname, lastname) {
	const path = "/forumLogin.php"
	const data = { username: `${firstname} ${lastname}` }
	const callback = (data) => {
		data = JSON.parse(data)
		console.log(data)
		if (data.success) {
			g_userId = localStorage.setItem("uid", data.user.id)
		}
	}

	ajaxRequest(path, "POST", data, callback, false)
}

export function newPost(userId, content) {
	const path = "/forumNewPost.php"
	const data = { id: userId, post: content }
	const callback = (data) => {
		console.log(JSON.parse(data))
	}

	ajaxRequest(path, "POST", data, callback, false)
}

export function deletePost(postId) {
	const path = "/forumDeletePost.php"
	const data = { id: postId }
	const callback = (data) => {
		console.log(data)
	}

	ajaxRequest(path, "GET", data, callback, false)
}

export function replyPost(userId, postId, content) {
	const path = "/forumReplyPost.php"
	const data = { uid: userId, id: postId, reply: content }
	const callback = (data) => {
		console.log(data)
	}

	ajaxRequest(path, "POST", data, callback)
}

export function deleteReply(replyId) {
	const path = "/forumDeleteReply.php"
	const data = { id: replyId }
	const callback = (data) => {
		console.log(data)
	}

	ajaxRequest(path, "GET", data, callback)
}

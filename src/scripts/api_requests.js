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
	const callback = (data) => {
		console.log(data)
		data = JSON.parse(data)
		if (data.hasOwnProperty("id")) {
			localStorage.setItem("user_id", data.id)
			localStorage.setItem("user_name", data.username)
			document.location.reload()
		}
	}

	ajaxRequest(path, "POST", data, callback)
}

export function loginUser(firstname, lastname) {
	const path = "/forumLogin.php"
	const data = { username: `${firstname} ${lastname}` }
	const callback = (data) => {
		console.log(data)
		data = JSON.parse(data)
		if (data.success) {
			localStorage.setItem("user_id", data.user.id)
			localStorage.setItem("user_name", data.user.username)
			document.location.reload()
		}
	}

	ajaxRequest(path, "POST", data, callback)
}

export function newPost(userId, content) {
	const path = "/forumNewPost.php"
	const data = { id: userId, post: content }
	const callback = (data) => {
		console.log(JSON.parse(data))
		document.location.reload()
	}

	ajaxRequest(path, "POST", data, callback)
}

export function deletePost(postId) {
	const path = "/forumDeletePost.php"
	const data = { id: postId }
	const callback = (data) => {
		console.log(JSON.parse(data))
		document.location.reload()
	}

	ajaxRequest(path, "GET", data, callback)
}

export function replyPost(userId, postId, content) {
	const path = "/forumReplyPost.php"
	const data = { user_id: userId, post_id: postId, reply: content }
	const callback = (data) => {
		console.log(JSON.parse(data))
		document.location.reload()
	}

	ajaxRequest(path, "POST", data, callback)
}

export function deleteReply(replyId) {
	const path = "/forumDeleteReply.php"
	const data = { id: replyId }
	const callback = (data) => {
		console.log(JSON.parse(data))
		document.location.reload()
	}

	ajaxRequest(path, "GET", data, callback)
}

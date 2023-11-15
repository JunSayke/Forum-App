export const POST_HTML = `<button
                            type="button"
                            class="list-group-item list-group-item-action"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-form"
                            data-bs-whatever="Forum Thread">
                            <div class="container-fluid d-flex gap-2">
                                <div class="d-flex justify-content-center align-items-center me-2">
                                    <img
                                        src="./src/imgs/topic_read_hot.png"
                                        style="width: 36px; height: 36px" />
                                </div>
                                <div
                                    class="container-fluid d-inline-block m-0 p-0 text-truncate"
                                    style="max-width: 50%">
                                    <h6 class="post-author m-0 p-0 text-truncate"></h6>
                                    <small class="post-content text-muted"></small>
                                </div>
                                <div class="container-fluid d-flex align-items-start justify-content-end">
                                    <div class="d-flex flex-column">
                                        <small class="post-date text-nowrap text-muted">
                                            12/11/2023 5:01PM
                                        </small>
                                        <small class="text-nowrap text-muted">
                                            Replies:
                                            <span class="post-replies badge bg-danger rounded">0</span>
                                        </small>
                                    </div>
                                </div>
                                <input
                                    type="button"
                                    class="btn-close ms-auto"
                                    style="font-size: small; visibility: hidden"
                                    aria-label="Close" />
                            </div>
                        </button>`

export const REPLY_HTML = `<div class="container-fluid d-flex flex-column p-2">
                                <div class="container-fluid d-flex p-2">
                                    <div class="d-flex justify-content-center align-items-center me-4">
                                        <img src="./src/imgs/user_profile_icon.png" style="
                                                width: 36px;
                                                height: 36px;" />
                                    </div>
                                    <div class="container-fluid d-inline-block m-0 p-0 text-truncate" style="max-width: 50%">
                                        <h6 class="post-author m-0 p-0 text-truncate"></h6>
                                        <small class="post-date text-muted"></small>
                                    </div>
                                </div>
                                <div class="container-fluid">
                                    <p class="post-content"></p>
                                </div>
                                <button class="btn btn-sm btn-outline-danger ms-auto" style="visibility: hidden">Delete</button>
                            </div>`

export const MODAL_FORM = "#modal-form"

export const MODAL_HEADER = `<div class="container-fluid d-flex justify-content-between align-items-center">
                                <h5 class="modal-title">MODAL HEADER</h5>
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>`

export const THREAD_MODAL_BODY = `<div class="container-fluid px-5"></div>`

export const THREAD_MODAL_FOOTER = `<form class="w-100 mx-5">
                                        <div class="mb-3">
                                            <label 
                                                for="reply-textarea" 
                                                class="form-label">
                                                WRITE A REPLY HERE: 
                                            </label>
                                            <textarea 
                                                class="form-control" 
                                                id="reply-textarea" 
                                                rows="3" 
                                                style="height: 100px; 
                                                resize: none
                                            "></textarea>
                                        </div>
                                        <div
                                            class="container-fluid d-flex align-items-center justify-content-end py-2 px-0">
                                            <button
                                                id="post-reply-btn"
                                                type="button"
                                                class="btn btn-secondary">
                                                Reply
                                            </button>
                                        </div>
                                    </form>`

export const REGISTER_MODAL_BODY = `<form>
                                        <div class="form-floating py-2">
                                            <input
                                                class="form-control"
                                                id="first-name"
                                                placeholder="First Name" />
                                            <label for="first-name">First Name</label>
                                        </div>
                                        <div class="form-floating py-2">
                                            <input
                                                class="form-control"
                                                id="last-name"
                                                placeholder="Last Name" />
                                            <label for="last-name">Last Name</label>
                                        </div>
                                    </form>`

export const LOGIN_MODAL_BODY = `<form>
                                    <div class="form-floating py-2">
                                        <input
                                            class="form-control"
                                            id="first-name"
                                            placeholder="First Name" />
                                        <label for="first-name">First Name</label>
                                    </div>
                                    <div class="form-floating py-2">
                                        <input
                                            class="form-control"
                                            id="last-name"
                                            placeholder="Last Name" />
                                        <label for="last-name">Last Name</label>
                                    </div>
                                </form>`

export const TOPIC_MODAL_BODY = `<form>
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
                                </form>`

export const MODAL_FOOTER_BUTTON = `<button
                                        type="button"
                                        class="btn btn-primary w-100">
                                    </button>`

export const LOGIN_REGISTER_BUTTON = `<ul class="navbar-nav ms-auto">
                                        <li class="nav-item">
                                            <button
                                                id="show-login-btn"
                                                type="button"
                                                class="btn btn-sm btn-success"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modal-form">
                                                Login
                                            </button>

                                            <button
                                                id="show-register-btn"
                                                type="button"
                                                class="btn btn-sm btn-outline-success"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modal-form">
                                                Register
                                            </button>
                                        </li>
                                    </ul>`

export const PROFILE_DROPDOWN = `<div class="btn-group btn-sm">
                                    <button
                                        id="profile-name"
                                        type="button"
                                        class="btn btn-secondary dropdown-toggle bg-transparent border-0 text-secondary"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        Username
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <button id="logout-btn" class="dropdown-item btn-sm">Logout</button>
                                        </li>
                                    </ul>
                                </div>`

export const NAV_HEADER = "#nav-header"

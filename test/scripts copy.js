$(document).ready(function () {
    getForumPosts();
});

let forumPosts = [];
const postsPerPage = 20;
let currentPage = 1;

function getForumPosts() {
    $.ajax({
        url: "http://hyeumine.com/forumGetPosts.php",
        method: "GET",
        success: (data) => {
            let posts = JSON.parse(data);
            forumPosts = [...posts];
            console.log(forumPosts);
            displayForumPosts();
        }
    });
}

function displayForumPosts() {
    const postListBoxElement = $("#post-list-box");
    postListBoxElement.empty();

    forumPosts.forEach(post => {
        let replies = 0;
        // if (post["post"].trim().length === 0) {
        //     return
        // }
        // Create a jquery dom object
        let newPost = $(
        `<li class="post-container">
            <div class="header bg-primary text-light">
                <p class="content">Please wait a moment . . .</p>
            </div>
            <div class="footer">
                <p class="author">by <span class="name">Loading . . .</span> - <span class="timestamp">Loading . . .</span></p>
                <p class="replies">Replies: Loading . . .</p>
            </div>
        </li>`);

        if ("reply" in post) {
            replies = post["reply"].length;
        }
        // Set the text content for the post and user elements
        // for simple security
        newPost.find('.content').text(post["post"]);
        newPost.find('.name').text(post["user"]);
        newPost.find('.timestamp').text(post["date"]);
        newPost.find('.replies').text("Replies: " + replies);

        postListBoxElement.append(newPost);
    });
}

// function displayForumPosts(page) {
//     const start = (page - 1) * postsPerPage;
//     const end = page * postsPerPage;
//     const postsToDisplay = forumPosts.slice(start, end);

//     const postListBoxElement = $("#post-list-box");
//     postListBoxElement.empty();

//     postsToDisplay.forEach(post => {
//         // Create a jquery dom object
//         let newPost = $(
//         `<div class="post-container">
//             <div class="post-header">
//                 <span class="post-content"></span>
//             </div>
//             <div class="post-footer">
//                 <span class="post-author"></span>
//                 <span class="post-timestamp"></span>
//             </div>
//         </div>
//         `);

//         // Set the text content for the post and user elements
//         // for simple security
//         newPost.find('.post-content').text(post["post"]);
//         newPost.find('.post-author').text(post["user"]);
//         newPost.find('.post-timestamp').text(post["date"]);

//         postListBoxElement.append(newPost);
        
//     });
// }

// function generatePagination() {
//     const totalPages = Math.ceil(forumPosts.length / postsPerPage);
//     const paginationElement = $("#pagination");
//     paginationElement.empty();

//     const maxVisiblePages = 7; // Maximum number of visible pages

//     if (totalPages <= maxVisiblePages) {
//         // If there are fewer pages than the maximum visible pages, show all pages.
//         for (let i = 1; i <= totalPages; i++) {
//             appendPageLink(i);
//         }
//     } else {
//         // Show the first page.
//         appendPageLink(1);

//         // Determine where to start and end the page links based on the current page.
//         let startPage = currentPage - 2;
//         if (startPage < 2) {
//             startPage = 2;
//         }

//         let endPage = startPage + maxVisiblePages - 3;
//         if (endPage >= totalPages - 1) {
//             endPage = totalPages - 1;
//         }

//         // Add ellipsis before the first page link if necessary.
//         if (startPage > 2) {
//             paginationElement.append("<span>...</span>");
//         }

//         // Add the visible page links within the range.
//         for (let i = startPage; i <= endPage; i++) {
//             appendPageLink(i);
//         }

//         // Add ellipsis after the last page link if necessary.
//         if (endPage < totalPages - 2) {
//             paginationElement.append("<span>...</span>");
//         }

//         // Show the last page.
//         appendPageLink(totalPages);
//     }
//     displayForumPosts(currentPage);
// }

// function appendPageLink(page) {
//     const pageLink = $(`<a class="page-button" href='#'>${page}</a>`);
//     if (currentPage == page) {
//         pageLink.addClass("active");
//     }
//     pageLink.on("click", () => {
//         currentPage = page;
//         generatePagination();
//         displayForumPosts(currentPage);
//     });
//     $("#pagination").append(pageLink);
// }


// function generatePagination() {
//     const totalPages = Math.ceil(forumPosts.length / postsPerPage);
//     const paginationElement = $("#pagination");
//     paginationElement.empty();

//     for (let i = 1; i <= totalPages; i++) {
//         const pageLink = $(`<a href='#'>${i}</a>`);
//         pageLink.on("click", () => {
//             currentPage = i;
//             generatePagination();
//             displayForumPosts(currentPage);
//         });
//         paginationElement.append(pageLink);
//         if (currentPage > 5 && i == 1) {
//             paginationElement.append($("<span>...</span>"));
//         }
//         if (currentPage <= totalPages - 5 && i == totalPages - 1) {
//             paginationElement.append($("<span>...</span>"));
//         }
//     }
// }

import * as CustomDialogs from './customdialogs.js';

export class BlogPost {
    constructor(title, date, summary) {
        this.title = title;
        this.date = date;
        this.summary = summary;
    }
}

let posts = [];
let postElements = [];
let outputElement;

// load posts from database
if (localStorage.getItem('blogPosts')) {
    posts = JSON.parse(localStorage.getItem('blogPosts')).filter(p => p && p.title !== undefined && p.date !== undefined && p.summary !== undefined);
}

// Must be called for module to output to DOM
export function attach(targetElement) {
    if (outputElement) {
        throw new Error("Already attached to an output element!");
    }
    outputElement = targetElement;
    loadBlogPosts();
}

// CRUD functions

// Enter BlogPost information into the DOM
function setBlogPostContent(postElement, post) {
    let template = `
        <header>
        <h3>${post.title}</h3>
        <time>${post.date}</time>
        </header>
        <p>${post.summary}</p>
        `;
    postElement.content.innerHTML = template;
}

// Add a new BlogPost to the DOM, appending to the attached output element
function appendPostElement(post) {
    let postElement = document.createElement('article');
    postElement.index = posts.indexOf(post);
    postElement.content = document.createElement('div');
    postElement.buttons = document.createElement('span');

    // Insert the content
    setBlogPostContent(postElement, post);
    postElement.appendChild(postElement.content);
    postElement.appendChild(postElement.buttons);

    // Add edit and delete buttons
    let editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => editPostDialog(Array.prototype.indexOf.call(outputElement.children, postElement)));
    postElement.buttons.appendChild(editButton);

    let deleteButton = document.createElement('button')
    deleteButton.type = 'button';
    deleteButton.innerText = 'Delete';
    // open a confirm dialog
    deleteButton.addEventListener('click', function showDeleteDialog() {
        deleteDialog.onclose = () => {
            if (deleteDialog.returnValue == 'true') {
                deletePost(Array.prototype.indexOf.call(outputElement.children, postElement));
            }
        };

        deleteDialog.returnValue = '';
        deleteDialog.showModal();
    });
    postElement.buttons.appendChild(deleteButton);

    // Update DOM
    outputElement.appendChild(postElement);
    postElements.push(postElement);
}

// Create a BlogPost from postDialog's form fields
function santizeDialogInput() {
    let title = DOMPurify.sanitize(postDialog.titleInput.value);

    // Now this is some of the worst jank I've ever seen in my life.
    // new Date('2023-03-02').toDateString() = Wed Mar 01 2023
    // new Date('2023/03/02').toDateString() = Thu Mar 02 2023

    // WHY??!??!?!?!
    // JavaScript, WHY?! This is HORRIBLE. What an AMAZING language.
    let date = new Date(DOMPurify.sanitize(postDialog.dateInput.value).replace(/-/g, '\/'));

    let summary = DOMPurify.sanitize(postDialog.summaryInput.value);

    if (!title || !summary || isNaN(date)) {
        return;
    }

    return new BlogPost(title, date.toDateString(), summary);
}

// add a new blog post to the database and append it to the DOM
function createBlogPost() {
    let post = santizeDialogInput();
    if (!post) {
        return;
    }

    // update database
    posts.push(post);
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    // update DOM
    appendPostElement(post);
}

// update an existing blog post
function editBlogPost(index) {
    let post = santizeDialogInput();
    if (!post) {
        return;
    }

    // update database
    posts[index] = post;
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    // update DOM
    setBlogPostContent(postElements[index], post);
}

// delete a blog post from both the DOM and the database
function deletePost(index) {
    console.log("index", index)
    if (index < 0 || index >= posts.length) {
        return;
    }

    // update database
    posts.splice(index, 1);
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    // update DOM
    outputElement.removeChild(postElements[index]);
    postElements.splice(index, 1);
}

// load blog posts from database and populate the DOM with blog posts
function loadBlogPosts() {
    if (!outputElement) {
        return;
    }

    outputElement.innerHTML = '';

    for (let post of posts) {
        appendPostElement(post, outputElement);
    }
}

// Post Creation Dialog, API

let postDialog = CustomDialogs.createDialog(`
<header><h2>Blog Post</h2></header>
<div>
<label for="title-input">Title:</label>
<input type="text" id="title-input" required><br>
<label for="date-input">Date:</label>
<input type="date" id="date-input" required><br>
<label for="summary-input">Summary:</label>
<textarea id="summary-input" required></textarea><br>
</div>
<button type="submit">OK</button>
</form>`, '');

postDialog.id = 'post-dialog';
document.body.appendChild(postDialog);

postDialog.titleInput = document.getElementById('title-input');
postDialog.dateInput = document.getElementById('date-input');
postDialog.summaryInput = document.getElementById('summary-input');


export function showPostDialog() {
    postDialog.titleInput.value = '';
    postDialog.dateInput.valueAsDate = new Date();
    postDialog.summaryInput.value = '';
    postDialog.showModal();
    postDialog.onclose = createBlogPost;
}

export function editPostDialog(index) {
    let post = posts[index];
    postDialog.titleInput.value = post.title;
    postDialog.dateInput.valueAsDate = new Date(post.date);
    postDialog.summaryInput.value = post.summary;
    postDialog.showModal();
    postDialog.onclose = () => editBlogPost(index);

}

export function closePostDialog() {
    postDialog.close();
}

// dialog that opens when deleting a blog post
let deleteDialog = CustomDialogs.createDialog(`
<header><h2>Delete Blog Post?</h2></header>
<button type="submit">Cancel</button>
<button type="submit" value="true">OK</button>
</form>`, '');

deleteDialog.id = "delete-dialog";
document.body.appendChild(deleteDialog);

// DOM elements
let articleForm = document.getElementById("article_form");

let postBtn = document.getElementById('postBtn');
let getBtn = document.getElementById('getBtn');
let putBtn = document.getElementById('putBtn');
let deleteBtn = document.getElementById('deleteBtn');

let out = document.getElementById('response');

postBtn.addEventListener('click', postRequest);
getBtn.addEventListener('click', getRequest);
putBtn.addEventListener('click', putRequest);
deleteBtn.addEventListener('click', deleteRequest);

// Collect form inputs. For some methods like GET and DELETE, it makes sense to only use the article ID.
function getFormData(idOnly=false) {
    let formData = new FormData(articleForm);
    if (idOnly) {
        formData.delete('article_name');
        formData.delete('article_body');
        formData.delete('article_date');
    } else {
        formData.set('article_date', new Date().toLocaleDateString());
    }
    return formData;
}

// Handle different request methods 

async function postRequest() {
    let response = await fetch('https://httpbin.org/post', {
        method: 'POST', body: getFormData()
    });
    renderResponse(response);
}

async function getRequest() {
    let response = await fetch('https://httpbin.org/get?' + new URLSearchParams(getFormData(true)), {
        method: 'GET'
    });
    renderResponse(response);
}

 async function putRequest() {
    let response = await fetch('https://httpbin.org/put', {
        method: 'PUT', body: getFormData()
    });
    renderResponse(response);
}

 async function deleteRequest() {
    let response = await fetch('https://httpbin.org/delete', {
        method: 'DELETE', body: getFormData(true)
    });
    renderResponse(response);
}

// Pretty-print response JSON. This relies on the 'white-space: pre' style attribute in the output tag.
async function renderResponse(response) {
    if (!response.ok) {
        throw new Error('Error fetching response');
    }
    const data = await response.json();
    out.innerHTML = JSON.stringify(data, null, 2);
}
let articleForm = document.getElementById("article_form");

let articleId = document.getElementById('article_id');
let articleName = document.getElementById('article_name');
let articleBody = document.getElementById('article_body');
let articleDate = document.getElementById('article_date');

let postBtn = document.getElementById('postBtn');
let getBtn = document.getElementById('getBtn');
let putBtn = document.getElementById('putBtn');
let deleteBtn = document.getElementById('deleteBtn');

let out = document.getElementById('response');

postBtn.addEventListener('click', postRequest);
getBtn.addEventListener('click', getRequest);
putBtn.addEventListener('click', putRequest);
deleteBtn.addEventListener('click', deleteRequest);

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

async function handleRequest(response) {
    if (!response.ok) {
        throw new Error('Error fetching response');
    }
    const data = await response.json();
    out.innerHTML = JSON.stringify(data, null, 2);
}

async function postRequest() {
    let response = await fetch('https://httpbin.org/post', {
        method: 'POST', body: getFormData()
    });
    handleRequest(response);
}

async function getRequest() {
    let response = await fetch('https://httpbin.org/get?' + new URLSearchParams(getFormData(true)), {
        method: 'GET'
    });
    handleRequest(response);
}

 async function putRequest() {
    let response = await fetch('https://httpbin.org/put', {
        method: 'PUT', body: getFormData()
    });
    handleRequest(response);
}

 async function deleteRequest() {
    let response = await fetch('https://httpbin.org/delete', {
        method: 'DELETE', body: getFormData(true)
    });
    handleRequest(response);
}


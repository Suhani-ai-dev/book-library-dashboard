let generatedCaptcha = "";
 
function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    generatedCaptcha = "";
 
    for (let i = 0; i < 6; i++) {
        generatedCaptcha += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }
 
    let captchaElement = document.getElementById("captchaCode");
    if (captchaElement) {
        captchaElement.innerText = generatedCaptcha;
    }
}
 
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let captcha = document.getElementById("captcha").value;
 
    if (
        user === "libraryAdmin" &&
        pass === "Lib@2026Secure" &&
        captcha === generatedCaptcha
    ) {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText =
            "Invalid Username, Password or CAPTCHA";
        generateCaptcha();
    }
}
 
function searchBook() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#bookTable tr");
 
    rows.forEach((row, index) => {
        if (index === 0) return;
 
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}
 
function addBook() {
    let book = document.getElementById("bookName").value;
    let author = document.getElementById("authorName").value;
    let genre = document.getElementById("genreName").value;
 
    if (book === "" || author === "" || genre === "") {
        alert("Please fill all fields");
        return;
    }
 
    let table = document.getElementById("bookTable");
    let row = table.insertRow();
 
    row.insertCell(0).innerText = book;
    row.insertCell(1).innerText = author;
    row.insertCell(2).innerText = genre;
    row.insertCell(3).innerHTML =
        '<button onclick="deleteBook(this)">Delete</button>';
    updateStats();    
 
    document.getElementById("bookName").value = "";
    document.getElementById("authorName").value = "";
    document.getElementById("genreName").value = "";
}
function updateStats() {
    let table = document.getElementById("bookTable");
    let rows = table.rows.length - 1; // exclude header
 
    document.getElementById("totalBooks").innerText = rows;
    document.getElementById("availableBooks").innerText = rows;
 
    let authors = new Set();
 
    for (let i = 1; i < table.rows.length; i++) {
        authors.add(table.rows[i].cells[1].innerText);
    }
 
    document.getElementById("totalAuthors").innerText = authors.size;
}
 
function deleteBook(button) {
    let row = button.parentElement.parentElement;
    row.remove();
    updateStats();
}
 
window.onload = function() {
    generateCaptcha();
    updateStats();
}
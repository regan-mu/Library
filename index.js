const form = document.querySelector(".my-form");
const addBook = document.querySelector(".add-btn");
const booksContainer = document.querySelector(".my-books");
const bookTitle = document.querySelector("#bk-title");
const bookAuthor = document.querySelector("#bk-author");
const bookPages = document.querySelector("#bk-pages");
let myLibrary = [];

// Form Validations
const validator = inputField => {
    inputField.addEventListener("input", () => {
        inputField.setCustomValidity("");
        inputField.checkValidity();
    })

    inputField.addEventListener("invalid", () =>{
        if (inputField.value === "") {
            inputField.setCustomValidity("This field cannot be empty!");
        }
    })
}

validator(bookTitle);
validator(bookAuthor);
validator(bookPages);


// Show form when add button is clicked.
addBook.addEventListener("click", () => {
    setTimeout(() => {form.classList.add("show-form")}, 200)
});

// Hide the form if you click outside the form.
document.addEventListener("click", (e) => {
    form.classList.contains("show-form") && !form.contains(e.target) ? form.classList.remove("show-form"): null;
});

// Create Card
function renderBookCard (book){
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookRead = document.createElement("p");
    const bookRemove = document.createElement("button");


    bookCard.classList.add("book-card");
    bookCard.id = myLibrary.indexOf(book);
    bookRemove.classList.add("remove-book");
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(bookRemove);

    bookTitle.textContent = `"${book.title}"`;
    bookAuthor.textContent = book.author;
    bookPages.textContent = `${book.pages} pages`;
    bookRead.textContent = `${book.read ? "Read": "Not Read"}`;
    bookRemove.textContent = "Remove";

    booksContainer.appendChild(bookCard);

    // Delete book Using the remove button;
    bookRemove.addEventListener("click", (e) => {
        let cardParent = e.target.parentNode
        booksContainer.removeChild(cardParent);
        myLibrary.splice(cardParent.id,1);
    });
};


// Book Constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages 
    this.read = read 
    this.info = () => {
        return `
        ${title}, by ${author}, ${pages} pages, 
        ${read ? "read": "Not read"}
        `;
    }
}
const bk1 = new Book("To Kill a Mockingbird", "Harper Lee", 150, false);
const bk2 = new Book("The Great Gatsby", "Scott Fitzgerald", 100, true);
myLibrary.push(bk1, bk2);

// Create a new book Object and append it to the library array
function getBook() {
    myLibrary.map(renderBookCard);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let formInfo = e.target;
        let newBook = new Book(
            formInfo.title.value, 
            formInfo.author.value, 
            formInfo.pages.value, 
            formInfo.read.checked
        );
        myLibrary.push(newBook);
        // Render New Card
        renderBookCard(newBook);
        form.reset();
        form.classList.remove("show-form")
    });
}
getBook();

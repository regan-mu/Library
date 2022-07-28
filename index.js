const form = document.querySelector(".my-form");
const addBook = document.querySelector(".add-btn");
const booksContainer = document.querySelector(".my-books");
const myLibrary = [];


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
        booksContainer.removeChild(e.target.parentNode);
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


// Create a new book Object and append it to the library array
function getBook() {
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

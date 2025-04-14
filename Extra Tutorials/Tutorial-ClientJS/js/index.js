const apiEndPoint = 'https://gist.githubusercontent.com/abdalabaaji/704636939bb6affbde10581513ca6770/raw/4493b39573cd0115b6c1cef5ca782fe0deccedc3/resbooks.json';


// we have all the element we are interacting with
const bookForm = document.querySelector('#book-form');
const bookList = document.querySelector('#book-list');

const title = document.querySelector('#title');
const author = document.querySelector('#author');

let editIndex = null;

// bookList.innerHTML = '<h1>Loading...</h1>';
let books = localStorage.books ? JSON.parse(localStorage.books) : [];

if (books.length === 0) fetchBooks();
else {
    console.log('books are already in the local storage');
    renderBooks();
}

// add event listener to the form
bookForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(bookForm);
    const book = Object.fromEntries(data);

    if (editIndex != null) {
        books[editIndex] = book;
        editIndex = null;
    } else {
        books.push(book);
    }
    localStorage.books = JSON.stringify(books);
    renderBooks();
    bookForm.reset();
}

async function fetchBooks() {
    const response = await fetch(apiEndPoint);
    books = await response.json();
    localStorage.books = JSON.stringify(books);
    renderBooks();
}

function renderBooks() {
    const bookItems = books.map((book, index) => `
      <li>
            <strong>${book.title}</strong>
            <span>${book.author}</span>
            <div class="button-container">
                <button class="edit" onclick="editBook(${index})">Edit</button>
                <button class="delete" onclick="deleteBook(${index})">Delete</button>
            </div>
        </li>
    `).join(' ');

    bookList.innerHTML = bookItems;

}

function editBook(index) {
    title.value = books[index].title;
    author.value = books[index].author;
    editIndex = index;

}

function deleteBook(index) {
    books.splice(index, 1);
    localStorage.books = JSON.stringify(books);
    renderBooks();

}

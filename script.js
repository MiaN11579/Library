let myLibrary = []
let currentIndex = -1

class Book {
    constructor(title, author, page, finish) {
        this.title = title
        this.author = author
        this.page = page
        this.finish = finish
    }
}

function addBookToLibrary(title, author, page, finish) {
    myLibrary.push(new Book(title, author, page, finish))
    saveLibrary()
}

function createBookCard(book, index) {
    let title = document.createElement("h3")
    title.innerText = book.title

    let author = document.createElement("p")
    author.innerText = "Author  : " + book.author

    let page = document.createElement("p")
    page.innerText = "Page : " + book.page

    let isFinished = document.createElement("p")
    if (book.finish) {
        isFinished.innerText = "Finished : " + "\uf14a"
    } else {
        isFinished.innerText = "Finished : " + "\uf0c8"
    }

    let finishButton = document.createElement("button")
    finishButton.innerText = "Finished"
    finishButton.classList.add("button")
    finishButton.onclick = function () {
        updateBookStatus(index)
    }

    let deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    deleteButton.classList.add("button")
    deleteButton.onclick = function () {
        deleteBook(index)
    }

    let editButton = document.createElement("button")
    editButton.innerText = "Edit"
    editButton.classList.add("button")
    editButton.onclick = function () {
        editBook(index)
    }

    let buttonContainer = document.createElement("div")
    buttonContainer.classList.add("container")
    buttonContainer.appendChild(finishButton)
    buttonContainer.appendChild(editButton)
    buttonContainer.appendChild(deleteButton)

    let content = document.createElement("div")
    content.classList.add("content")
    content.appendChild(title)
    content.appendChild(author)
    content.appendChild(page)
    content.appendChild(isFinished)
    content.appendChild(buttonContainer)

    let cardContent = document.createElement("div")
    cardContent.classList.add("card-content")
    cardContent.appendChild(content)

    let card = document.createElement("div")
    card.classList.add("card")
    card.appendChild(cardContent)

    let column = document.createElement("div")
    column.classList.add("column")
    column.dataset.libraryIndex = index
    column.appendChild(card)

    return column
}

function showBooks() {
    document.getElementById("cards").innerHTML = '';
    if (myLibrary.length != 0) {
        myLibrary.forEach((book, index) => insertCard(book, index))
    }
    saveLibrary()
}

function insertCard(book, index) {
    if (hasPlaceInLastRow()) {
        cardHTML = createBookCard(book, index)
        let rows = document.getElementsByClassName("columns")
        let lastRow = rows[rows.length - 1]
        lastRow.appendChild(cardHTML)
    } else {
        createRow()
        insertCard(book, index)
    }
}

function hasPlaceInLastRow() {
    let rows = document.getElementsByClassName("columns")

    if (rows.length === 0) {
        return false
    } else {
        let lastRow = rows[rows.length - 1]
        let amountOfColumnInRow = lastRow.getElementsByClassName("column").length
        if (amountOfColumnInRow < 3) {
            return true
        } else {
            return false
        }
    }
}

function createRow() {
    let newRow = document.createElement("div")
    newRow.classList.add("columns")
    document.getElementById("cards").appendChild(newRow)
}

function activeModal() {
    document.getElementById("addBookModal").classList.add("active")
}

function closeModalRefresh() {
    showBooks()
    document.getElementById("addBookForm").reset();
    document.getElementById("addBookModal").classList.remove("active")
}

function addBookAndCloseModal(currentIndex) {
    let title = document.getElementById('book-title').value
    let author = document.getElementById('book-author').value
    let pages = document.getElementById('book-pages').value
    let isFinishedAnswer = document.querySelector('input[name="answer"]:checked').value;
    if (isFinishedAnswer == "0") {
        var isFinished = false
    } else { var isFinished = true }

    if (document.getElementById('add').innerText == "Add") {
        addBookToLibrary(title, author, pages, isFinished)
    } else {
        myLibrary[currentIndex].title = document.getElementById('book-title').value 
        myLibrary[currentIndex].author = document.getElementById('book-author').value 
        myLibrary[currentIndex].page = document.getElementById('book-pages').value 
        showBooks()
        document.getElementById('add').innerText = "Add"
    }
    closeModalRefresh()
}

function updateBookStatus(index) {
    myLibrary[index].finish = !myLibrary[index].finish
    showBooks()
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    saveLibrary()
    showBooks()
}

function editBook(index) {
    document.getElementById('book-title').value = myLibrary[index].title
    document.getElementById('book-author').value = myLibrary[index].author
    document.getElementById('book-pages').value = myLibrary[index].page
    if (myLibrary[index].finish) {
        document.querySelector('input[name="answer"]:checked').value = "1"
    } else {
        document.querySelector('input[name="answer"]:checked').value = "0"
    }
    document.getElementById("add").innerText = "Update"
    currentIndex = index
    activeModal();
}

// Local Storage

function saveLibrary() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLibrary() {
    if (localStorage.getItem('myLibrary')) {
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
    } else {
        console.log("Cannot retrieve library from local storage.")
    }
}

function loadLibraryAndShow() {
    loadLibrary()
    showBooks()
}
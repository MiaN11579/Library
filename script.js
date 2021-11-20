let myLibrary = []

class Book {
    constructor(title, author, page, read) {
        this.title = title
        this.author = author
        this.page = page
        this.read = read
    }
}

function addBookToLibrary(title, author, page, read) {
    myLibrary.push(new Book(title, author, page, read))
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
    if (book.read) {
        isFinished.innerText = "Finished : " + "\uf14a"
    } else {
        isFinished.innerText = "Finished : " + "\uf0c8"
    }

    let finishButton = document.createElement("button")
    finishButton.innerText = "Finished"
    finishButton.classList.add("button")
    finishButton.onclick = function() {
        updateBookStatus(index)
    }

    let deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    deleteButton.classList.add("button")
    deleteButton.onclick = function() {
        deleteBook(index)
    }

    let buttonContainer = document.createElement("div")
    buttonContainer.classList.add("container")
    buttonContainer.appendChild(finishButton)
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
}

function insertCard(book, index) {
    if (hasPlaceInLastRow()) {
        cardHTML = createBookCard(book, index)
        let rows = document.getElementsByClassName("columns")
        let lastRow = rows[rows.length - 1]
        lastRow.appendChild(cardHTML)
    } else {
        createRow()
        insertCard(book, index) //Recursive call
    }
}
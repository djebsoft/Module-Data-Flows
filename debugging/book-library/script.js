const myLibrary = [];
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

window.addEventListener("load", function (e) {
  populateStorage();
  render();
  document.getElementById("submit").addEventListener("click", submit);
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robinson Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  const trimmedTitle = titleInput.value.trim();
  const trimmedAuthor = authorInput.value.trim();
  const pagesInt = parseInt(pagesInput.value, 10);
  if (trimmedTitle === "") {
    alert("Please enter a title.");
    return false;
  }
  if (trimmedAuthor === "") {
    alert("Please enter an author.");
    return false;
  }
  if (isNaN(pagesInt) || pagesInt <= 0) {
    alert("Please enter a valid number of pages");
    return false;
  }

  const book = new Book(
    trimmedTitle,
    trimmedAuthor,
    pagesInt,
    checkInput.checked
  );
  myLibrary.push(book);
  render();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const table = document.getElementById("display");
  const tbody = table.tBodies[0];
  tbody.innerHTML = "";
  //insert updated row and cells
  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = tbody.insertRow(-1);
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    wasReadCell.appendChild(changeBut);

    changeBut.innerText = myLibrary[i].check ? "Yes" : "No";

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    const delBut = document.createElement("button");
    deleteCell.appendChild(delBut);
    delBut.className = "btn btn-warning";
    delBut.innerHTML = "Delete";
    delBut.addEventListener("click", function () {
      myLibrary.splice(i, 1);
      alert(`You've deleted title: ${myLibrary[i].title}`);
      render();
    });
  }
}

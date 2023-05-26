const openBooks = (e) => {
  if (e.code == "Enter") {
    let books = document.getElementsByClassName("books")[0];
    books.classList.add("inCenter");
    for (child of books.children) {
      child.classList.add("inCenter");
    }
  }
};

document.getElementsByTagName("body")[0].addEventListener("keydown", openBooks);

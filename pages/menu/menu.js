let typed = "";
let state = -1;
let options1 = ["Novo Jogo", "Melhores Jogadores", "Finalizar Sessao"];
let options2 = ["Novo Jogo", "Melhores Jogadores", "Finalizar Sessao"];
let selected = {};
let char = 0;
const digitar = (e) => {
  let key = e.code.replace("Key", "").replace("Space", " ");
  typed += key;
  console.log(state);
  if (state == -1) {
    selected = options1.find((opt) => opt[0].toUpperCase() == typed[0]);
    if (!selected) {
      typed = "";
      state = -1;
    } else {
      state = 1;
    }
  }
  if (state == 2) {
    selected = options2.find((opt) => opt[0].toUpperCase() == typed[0]);
    if (!selected) {
      typed = "";
      state = 3;
    } else {
      state = 2;
    }
  }

  if (state < 2 && typed.length > 1) {
    for (let i = 1; i < typed.length; i++) {
      if (selected[i].toUpperCase() != typed[i]) {
        selected = undefined;
        typed = "";
        state = -1;
        break;
      } else {
        char = i;
      }
      if (char == selected.length - 1) {
        openBooks(selected.replace(" ", "_"));
        selected = undefined;
        typed = "";
        state = 2;
      }
    }
  }
};

const openBooks = (id) => {
  let books = document.getElementById(id);
  books.classList.add("inCenter");
  for (child of books.children) {
    child.classList.add("inCenter");
  }
};

document.getElementsByTagName("body")[0].addEventListener("keydown", digitar);

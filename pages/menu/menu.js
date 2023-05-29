let typed = "";
let state = -1;
let options1 = ["Novo Jogo", "Melhores Jogadores", "Finalizar Sessao"];
let options2 = ["Voltar"];
let selected = {};
let char = 0;
let isOpen = "";

const digitar = (e) => {
  let key = e.code.replace("Key", "").replace("Space", " ");
  typed += key;
  console.log(selected, state);
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
      state = 2;
    } else {
      state = 3;
    }
  }

  if (state == 1 && typed.length > 1) {
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
        isOpen = selected;
        selected = undefined;
        typed = "";
        state = 2;
      }
    }
  }
  if (state == 3 && typed.length > 1) {
    for (let i = 1; i < typed.length; i++) {
      if (selected[i].toUpperCase() != typed[i]) {
        selected = undefined;
        typed = "";
        state = 2;
        break;
      } else {
        char = i;
      }

      if (char == selected.length - 1) {
        if (selected == "Voltar") {
          closeBooks(isOpen.replace(" ", "_"));
          selected = undefined;
          typed = "";
          state = -1;
        } else {
          null;
        }
      }
    }
  }
};

const openBooks = (id) => {
  let book = document.getElementById(id);
  book.classList.add("inCenter");
  for (child of book.children) {
    child.classList.add("inCenter");
    for (child2 of child.children) {
      child2.classList.add("inCenter");
    }
  }
};

const closeBooks = (id) => {
  let book = document.getElementById(id);
  book.classList.remove("inCenter");
  for (child of book.children) {
    child.classList.remove("inCenter");
    for (child2 of child.children) {
      child2.classList.remove("inCenter");
    }
  }
};

document.getElementsByTagName("body")[0].addEventListener("keydown", digitar);

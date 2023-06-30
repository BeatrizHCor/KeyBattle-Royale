let typed = "";
let state = 0;
let options1 = ["Novo Jogo", "Ligas", "Melhores Jogadores", "Tutorial", "Sair"];
let options2 = [
  "Voltar",
  "Casual",
  "Ranqueado",
  "Gerar Nova",
  "Entrar",
  "Ligas",
  "Todos",
];
let selected = {};
let char = 0;
let isOpen = "";
let selectedText = "";
let selectedBook = "";

const addColor = (i, param) => {
  selectedText.children[i].style = ` text-shadow: 1px 4px 9px  ${gerenateRGB(
    param
  )}; `;
};

const resetColors = () => {
  for (child of selectedText.children) {
    child.style = "";
  }
  selectedText = "";
};

const gerenateRGB = (param) => {
  let min = param == "light" ? 170 : param == "dark" ? 0 : 100;
  let factor = param == "light" ? 86 : param == "dark" ? 40 : 156;
  let r = Math.floor(Math.random() * factor) + min;
  let g = Math.floor(Math.random() * factor) + min;
  let b = Math.floor(Math.random() * factor) + min;
  return `rgb(${r}, ${g}, ${b})`;
};

const digitar = (e) => {
  let key = e.code.replace("Key", "").replace("Space", " ");
  typed += key;
  if (state == 0) {
    selected = options1.find((opt) => opt[0].toUpperCase() == key);
    if (!selected) {
      typed = "";
      state = 0;
      char = 0;
    } else {
      state = 1;
      char = 1;
      selectedText = document.getElementById(
        selected.replace(" ", "_") + "_Text"
      );
      addColor(0, "light");
    }
  } else if (state == 2) {
    selected = options2.find((opt) => opt[0].toUpperCase() == key);

    if (!selected) {
      typed = "";
      state = 2;
    } else {
      state = 3;
      char = 1;
      selectedText = document.getElementById(
        selected.replace(" ", "_") + "_" + isOpen.replace(" ", "_")
      );
      addColor(0, "dark");
    }
  } else if (state == 1) {
    if (selected[char].toUpperCase() != key) {
      selected = undefined;
      typed = "";
      state = 0;
      char = 0;
      resetColors();
    } else {
      addColor(char, "light");
      char += 1;
      if (char == selected.length) {
        if (selected == "Sair") {
          logOut();
        } else {
          openBooks(selected.replace(" ", "_"));
          isOpen = selected;
          selected = undefined;
          typed = "";
          state = 2;
          char = 0;
          resetColors();
        }
      }
    }
  } else if (state == 3) {
    if (selected[char].toUpperCase() != key) {
      selected = undefined;
      typed = "";
      state = 2;
      char = 0;
      resetColors();
    } else {
      addColor(char, "dark");
      char += 1;
      console.log(char);
      if (char == selected.length) {
        if (selected == "Casual") {
          location.href = "/pages/game/game.html";
        }
        if (selected == "Gerar Nova") {
          registerLeagueForm();
          selected = undefined;
          typed = "";
          state = 4;
          char = 0;
          resetColors();
        }
        if (selected == "Entrar") {
          enterLeagueForm();
          selected = undefined;
          typed = "";
          state = 4;
          char = 0;
          resetColors();
        }
        if (selected == "Voltar") {
          closeBooks(isOpen.replace(" ", "_"));
          selected = undefined;
          typed = "";
          state = 0;
          resetColors();
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

const registerLeagueForm = () => {
  let form = document.getElementById("leagueform");
  form.innerHTML = "";
  form.setAttribute("onsubmit", "registerLeague(event)");
  let nameI = document.createElement("input");
  nameI.setAttribute("name", "name");
  nameI.setAttribute("type", "text");
  nameI.setAttribute("id", "league-name");
  let nameL = document.createElement("h1");
  nameL.innerHTML = "Nome da Liga";
  let nameD = document.createElement("div");
  nameD.classList.add("label-input");
  let nameEr = document.createElement("p");
  nameEr.classList.add("erro");
  nameEr.setAttribute("id", "erro_name");
  nameD.appendChild(nameL);
  nameD.appendChild(nameI);
  nameD.appendChild(nameEr);
  let passwordI = document.createElement("input");
  passwordI.setAttribute("name", "password");
  passwordI.setAttribute("type", "text");
  passwordI.setAttribute("id", "league-pass");
  let passwordL = document.createElement("h1");
  passwordL.innerHTML = "Senha";
  let passwordD = document.createElement("div");
  passwordD.classList.add("label-input");
  let passwordEr = document.createElement("p");
  passwordEr.classList.add("erro");
  passwordEr.setAttribute("id", "erro_password");
  passwordD.appendChild(passwordL);
  passwordD.appendChild(passwordI);
  passwordD.appendChild(passwordEr);
  let confpassI = document.createElement("input");
  confpassI.setAttribute("name", "confpass");
  confpassI.setAttribute("type", "text");
  confpassI.setAttribute("id", "league-confpass");
  let confpassL = document.createElement("h1");
  confpassL.innerHTML = "Confirme a senha";
  let confpassD = document.createElement("div");
  confpassD.classList.add("label-input");
  let confpassEr = document.createElement("p");
  confpassEr.classList.add("erro");
  confpassEr.setAttribute("id", "erro_confpass");
  confpassD.appendChild(confpassL);
  confpassD.appendChild(confpassI);
  confpassD.appendChild(confpassEr);
  let messenger = document.createElement("p");
  passwordD.setAttribute("id", "messenger");
  let btn = document.createElement("button");
  btn.setAttribute("type", "submit");
  btn.classList.add("btn");
  btn.innerHTML = "Criar";
  form.appendChild(nameD);
  form.appendChild(passwordD);
  form.appendChild(confpassD);
  form.appendChild(btn);
  form.appendChild(messenger);
};

const enterLeagueForm = () => {
  let form = document.getElementById("leagueform");
  form.innerHTML = "";
  form.setAttribute("onsubmit", "registerUserLeague(event)");
  let nameI = document.createElement("input");
  nameI.setAttribute("name", "name");
  nameI.setAttribute("type", "text");
  nameI.setAttribute("id", "league-name");
  let nameL = document.createElement("h1");
  nameL.innerHTML = "Nome da Liga";
  let nameD = document.createElement("div");
  nameD.classList.add("label-input");
  let nameEr = document.createElement("p");
  nameEr.classList.add("erro");
  nameEr.setAttribute("id", "erro_name");
  nameD.appendChild(nameL);
  nameD.appendChild(nameI);
  nameD.appendChild(nameEr);
  let passwordI = document.createElement("input");
  passwordI.setAttribute("name", "password");
  passwordI.setAttribute("type", "text");
  passwordI.setAttribute("id", "league-pass");
  let passwordL = document.createElement("h1");
  passwordL.innerHTML = "Senha";
  let passwordD = document.createElement("div");
  passwordD.classList.add("label-input");
  let passwordEr = document.createElement("p");
  passwordEr.classList.add("erro");
  passwordEr.setAttribute("id", "erro_password");
  let btn = document.createElement("button");
  btn.setAttribute("type", "submit");
  btn.classList.add("btn");
  let messenger = document.createElement("p");
  passwordD.setAttribute("id", "messenger");
  btn.innerHTML = "Entrar";
  passwordD.appendChild(passwordL);
  passwordD.appendChild(passwordI);
  passwordD.appendChild(passwordEr);
  form.appendChild(nameD);
  form.appendChild(passwordD);
  form.appendChild(btn);
  form.appendChild(messenger);
};

document.getElementsByTagName("body")[0].addEventListener("keydown", digitar);

const registerLeague = async (e) => {
  e.preventDefault();
  let erro = false;
  let name = document.getElementById("league-name").value.trim();
  let password = document.getElementById("league-pass").value;
  let confpass = document.getElementById("league-confpass").value;
  let resp = await (
    await fetch("./registerLeague.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ name, password, confpass }),
    })
  ).json();
  for (key of Object.keys(resp)) {
    if (!erro && resp[key] != "") {
      erro = true;
    }
    document.getElementById(key).innerHTML = resp[key];
  }
  if (!erro) {
    let form = document.getElementById("leagueform");
    form.innerHTML = "Liga Criada com Sucesso!";
    state = 2;
  }
};

const registerUserLeague = async (e) => {
  e.preventDefault();
  let erro = false;
  let name = document.getElementById("league-name").value.trim();
  let password = document.getElementById("league-pass").value;
  let resp = await (
    await fetch("./registerUserLeague.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ name, password }),
    })
  ).json();
  for (key of Object.keys(resp)) {
    if (!erro && resp[key] != "") {
      erro = true;
    }
    document.getElementById(key).innerHTML = resp[key];
  }
  if (!erro) {
    let form = document.getElementById("leagueform");
    form.innerHTML = "Você entrou com sucesso!";
    state = 2;
  }
};

const logOut = async () => {
  await fetch("./logout.php").then(
    (e) => (location.href = "/pages/home/home.html")
  );
};

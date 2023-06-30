function openBook() {
  pages = document.getElementsByClassName("page");
  cover = document.getElementsByClassName("cover")[0];
  card = document.getElementsByClassName("card")[0];
  login = document.getElementById("login");
  registro = document.getElementById("registro");
  cover.classList.remove("closed");
  card.classList.remove("closed");
  login.classList.remove("closed");
  registro.classList.remove("closed");
  for (i = 0; i < pages.length - 1; i++) {
    pages[i].classList.remove("closed");
  }
  cover.classList.add("turn");
  card.classList.add("turn");
  login.classList.add("turn");
  registro.classList.add("turn");
  for (i = 0; i < pages.length - 1; i++) {
    pages[i].classList.add("turn");
  }
}

setTimeout(() => {
  document.getElementsByClassName("card")[0].classList.remove("inShelf");
  clearTimeout();
}, 5000);

document.getElementById("registrar").addEventListener("click", openBook);

function closeBook() {
  pages = document.getElementsByClassName("page");
  cover = document.getElementsByClassName("cover")[0];
  card = document.getElementsByClassName("card")[0];
  login = document.getElementById("login");
  cover.classList.remove("turn");
  card.classList.remove("turn");
  login.classList.remove("turn");
  registro.classList.remove("turn");
  for (i = 0; i < pages.length - 1; i++) {
    pages[i].classList.remove("turn");
  }
  registro = document.getElementById("registro");
  cover.classList.add("closed");
  card.classList.add("closed");
  login.classList.add("closed");
  registro.classList.add("closed");
  for (i = 0; i < pages.length - 1; i++) {
    pages[i].classList.add("closed");
  }
}

document.getElementById("Voltar").addEventListener("click", closeBook);

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const loginFunction = async (e) => {
  e.preventDefault();
  let erro = false;
  let username = document.getElementById("username-login").value.trim();
  let password = document.getElementById("password-login").value;
  let form_name = document.getElementById("form_name_login").value;
  let resp = await (
    await fetch("./login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ username, password, form_name }),
    })
  ).json();
  for (key of Object.keys(resp)) {
    if (!erro && resp[key] != "") {
      erro = true;
      console.log(erro);
    }
    document.getElementById(key).innerHTML = resp[key];
  }
  if (!erro) {
    window.location.href = "/pages/menu/menu.html";
  }
};

const registerFunction = async (e) => {
  e.preventDefault();
  let erro = false;
  let elements = document.getElementById("registro").elements;
  let form_name = elements[0].value;
  let usernameReg = elements[1].value.trim();
  let passwordReg = elements[3].value;
  let emailReg = elements[2].value.trim();
  let passwordConfReg = elements[4].value;
  let resp = await (
    await fetch("./login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        usernameReg,
        passwordReg,
        emailReg,
        passwordConfReg,
        form_name,
      }),
    })
  ).json();
  for (key of Object.keys(resp)) {
    if (!erro && resp[key] != "") {
      erro = true;
    }
    document.getElementById(key).innerHTML = resp[key];
  }
  if (!erro) {
    await (
      await fetch("./login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          usernameReg,
          passwordReg,
          form_name: "login",
        }),
      })
    ).json();
    window.location.href = "/pages/menu/menu.html";
  }
};

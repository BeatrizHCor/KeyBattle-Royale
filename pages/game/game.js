import { generatePhrase } from "../dictionary.js";
let turn = 1;
let state = 0;
let selected = null;
let text = null;
let options = ["Sol", "Terra", "Ar", "Oceano", "Noite", "Desistir"];
let char = 0;
let book = document.getElementById("book");
let bookText = document.getElementById("bookText");
let errors = 0;
let generated = "";

const addColor = (i) => {
  text.children[i].style = `text-shadow:  2px 4px 16px  rgb(0, 0, 0)`;
  text.children[i].style.color = `${generateMagicColor()}`;
};

const resetOptions = () => {
  for (let i = 0; i < text.children.length; i++) {
    text.children[i].style = "";
  }
  text = null;
};

const openBook = () => {
  book.classList.add("open");
  for (let i = 0; i < book.children - 1; i++) {
    console.log(book.children);
    book.children[i].classList.add("open");
  }
};

const closeBook = () => {
  book.classList.remove("open");
  for (child of book.children) {
    child.classList.remove("open");
  }
};

const generateMagicColor = () => {
  let r = 0;
  let g = 0;
  let b = 0;
  switch (selected) {
    default:
      r = 90;
      g = 80;
      b = 150;
      break;
    case "Sol":
      r = 255;
      g = 150;
      b = 120;
      break;
    case "Terra":
      r = 100;
      g = 200;
      b = 80;
      break;
    case "Ar":
      r = 200;
      g = 200;
      b = 255;
      break;
    case "Oceano":
      r = 100;
      g = 200;
      b = 255;
      break;
    case "Desistir":
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
      break;
  }
  return `rgb(${r}, ${g}, ${b})`;
};

const getInput = (e) => {
  let key = e.code.replace("Key", "");
  switch (state) {
    case 0:
      if (key == "Enter") {
        state = 1;
        document.getElementById("title").remove();
        setInterval(() => {
          errors += 1;
          document.getElementById("health").style.width = `${100 - errors}%`;
        }, 60000);
      }
      break;
    case 1:
      selected = options.find((opt) => opt[0] == key);
      if (!selected) {
        state = 1;
      } else {
        text = document.getElementById(selected + "_Text");
        addColor(0);
        char += 1;
        state = 2;
      }
      break;
    case 2:
      if (selected[char].toUpperCase() != key) {
        resetOptions();
        selected = null;
        char = 0;
        state = 1;
      } else {
        addColor(char);
        if (char != selected.length - 1) {
          char += 1;
        } else {
          if (selected == "Desistir") {
            location.href = "/pages/menu/menu.html";
          }
          state = 3;
          char = 0;
          generated = generatePhrase(turn);
          bookText.innerHTML =
            "<span style='border-bottom: 1px solid var(--bluetext)' >" +
            generated.split("").join("</span><span>") +
            "</span>";
          openBook();
          resetOptions();
        }
      }
      break;
    case 3:
      if (
        generated[char].toUpperCase() == key ||
        (generated[char] == " " && key == "Space")
      ) {
        bookText.children[char].style =
          "text-shadow:  0px 0px 12px  rgb(100, 100, 255); color: var(--gray); border-bottom: 1px solid var(--green)";
        let at = document.createElement("div");
        at.classList.add("attack");
        at.setAttribute("id", "attack");
        at.classList.add(selected);
        document.getElementById("book").appendChild(at);
        setTimeout(() => document.getElementById("attack").remove(), 1500);
      } else {
        errors += 1;
        document.getElementById("health").style.width = `${100 - errors}%`;
        if (errors > 99) {
          endGame();
        }
        bookText.children[char].style =
          "text-shadow:  0px 0px 8px  rgb(255, 100, 100); color: var(--bluetext); border-bottom: 1px solid red";
      }
      char += 1;
      bookText.children[char].style =
        "border-bottom: 1px solid var(--bluetext)";
      if (char == generated.length - 1) {
        bookText.innerHTML = "";
        state = 1;
        selected = null;
        char = 0;
        turn += 1;
      }
      break;
    default:
      null;
      break;
  }
};

const endGame = async () => {
  let resp = await (
    await fetch("./postScore.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        score: turn,
        ID_league: Number(location.href.split("=")[1]),
      }),
    })
  ).json();
  if (resp == "ok") {
    location.href = "/pages/menu/menu.html";
  }
};

document.getElementsByTagName("body")[0].addEventListener("keydown", getInput);

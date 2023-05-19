
function openBook(){
  pages = document.getElementsByClassName("page")
  cover = document.getElementById("cover")
  card = document.getElementById("card")
  login = document.getElementById("login")
  registro = document.getElementById("registro")
  cover.classList.remove("closed");
  card.classList.remove("closed");
  login.classList.remove("closed")
  registro.classList.remove("closed")
  for(i = 0; i < pages.length -1; i++){
    pages[i].classList.remove("closed")
  }
  cover.classList.add("turn");
  card.classList.add("turn");
  login.classList.add("turn")
  registro.classList.add("turn")
  for(i = 0; i < pages.length -1; i++){
    pages[i].classList.add("turn")
  }
}


setTimeout(() => {
  document.getElementById("card").classList.remove("inShelf")
  clearTimeout();
}, 5000)

document.getElementById("registrar").addEventListener("click", openBook)



function closeBook(){
  pages = document.getElementsByClassName("page")
  cover = document.getElementById("cover")
  card = document.getElementById("card")
  login = document.getElementById("login")
  registro = document.getElementById("registro")
  cover.classList.add("closed");
  card.classList.add("closed");
  login.classList.add("closed")
  registro.classList.add("closed")
  for(i = 0; i < pages.length -1; i++){
    pages[i].classList.add("closed")
  }
  setTimeout(() => {
    cover.classList.remove("turn");
    card.classList.remove("turn");
    login.classList.remove("turn")
    registro.classList.remove("turn")
    for(i = 0; i < pages.length -1; i++){
      pages[i].classList.remove("turn")
    }
    clearTimeout();
  }, 500)

}




document.getElementById("Voltar").addEventListener("click", closeBook)
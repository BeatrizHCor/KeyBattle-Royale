
function openBook(){
  pages = document.getElementsByClassName("page")
  cover = document.getElementById("cover")
  card = document.getElementById("card")
  login = document.getElementById("login")
  cover.classList.add("turn");
  card.classList.add("turn");
  login.classList.add("turn")
  for(i = 0; i < pages.length -1; i++){
    pages[i].classList.add("turn")
  }
}




document.getElementById("registrar").addEventListener("click", openBook)

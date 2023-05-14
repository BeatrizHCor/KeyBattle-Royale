


function changeform(){
  changers = document.getElementsByClassName("changer")
  for(let i = 0; i < changers.length; i++){
    if(changers[i].style.top == "90%"){
      changers[i].style.top = "80%";
    }
    else {
      changers[i].style.top = "90%";
    }
  }
}




document.getElementById("changer-left").addEventListener("click", changeform)
document.getElementById("changer-right").addEventListener("click", changeform)


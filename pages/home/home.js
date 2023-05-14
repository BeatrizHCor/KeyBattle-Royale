


function changeform(){
  changers = document.getElementsByClassName("changer")
  for(let i = 0; i < changers.length; i++){
    if(changers[i].style.top == "80%"){
      changers[i].style.top = "10%";
    }
    else {
      changers[i].style.top = "80%";
    }
  }
}




document.getElementById("changer-left").addEventListener("click", changeform)
document.getElementById("changer-right").addEventListener("click", changeform)


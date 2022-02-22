console.log("JS LOADED");

let displayMemes = document.getElementById("display-memes").style

document.getElementById("attack-button").onclick = ()=>{
    // document.getElementById("display-memes")
    if(displayMemes.display === 'none'){
      displayMemes.display = "block"
    }
    else{
      displayMemes.display = "none"
    }
  }


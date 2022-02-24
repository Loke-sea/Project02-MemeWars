console.log("JS LOADED");

function toggleDisplay(itemToDisplay, itemToHide) {

  if (itemToDisplay.style.display === 'none' || itemToDisplay.style.display === '') {
    itemToDisplay.style.display = "flex"
    itemToHide.style.display = "none"
  }
  else {
    itemToDisplay.style.display = "none"
    console.log(itemToDisplay.style.display);
  }
}

window.onload = () => {
  
  document.getElementById("search-button").onclick = () => {
    let searchForm = document.getElementById("search-form")
    let searchButton = document.getElementById("search-button")
    toggleDisplay(searchForm, searchButton)
  }

  document.getElementById("menu-button").onclick = () => {
    let navBarLinks = document.getElementById("navbar-links-container")
    toggleDisplay(navBarLinks)
  }
}

let displayMemes = document.getElementById("display-memes").style

document.getElementById("attack-button").onclick = () => {
  // document.getElementById("display-memes")
  if (displayMemes.display === 'none') {
    displayMemes.display = "block"
  }
  else {
    displayMemes.display = "none"
  }
}

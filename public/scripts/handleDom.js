console.log("JS LOADED");

function toggleDisplay(itemToDisplay) {

  if (itemToDisplay.style.display === 'none') {
    itemToDisplay.style.display = "flex"
  }
  else {
    itemToDisplay.style.display = "none"
    console.log(itemToDisplay.style.display);
  }
}

window.onload = () => {
  document.getElementById("search-button").onclick = () => {
    let searchForm = document.getElementById("search-form")
    if (searchForm.style.display === 'none') {
      searchForm.style.display = "flex"
      document.getElementById("search-button").style.display = "none"
    }
    else {
      searchForm.style.display = "none"
    }
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

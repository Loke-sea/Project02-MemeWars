console.log("JS LOADED");
let searchForm = document.getElementById("search-form")
let searchButton = document.getElementById("search-button")
let navBarLinks = document.getElementById("navbar-links-container")

function toggleDisplay(itemToDisplay, itemToHide) {
  if (itemToDisplay.style.display === 'none' || itemToDisplay.style.display === '') {
    itemToDisplay.style.display = "flex"
    itemToHide.style.display = "none"
  }
  else {
    itemToDisplay.style.display = "none"
  }
}


window.onload = () => {
  document.getElementById("search-button").onclick = () => {
    toggleDisplay(searchForm, searchButton)
  }

  document.getElementById("menu-button").onclick = () => {
    toggleDisplay(navBarLinks)
  }

  document.addEventListener("click", (target) => {
    let targetPathClass = target.path[0].className
    if (targetPathClass != "search-input" && searchForm.style.display === "flex" && targetPathClass != "fa-solid fa-magnifying-glass") {
      searchForm.style.display = "none";
      searchButton.style.display = "flex"
    }
    if (targetPathClass != "nav-link" && navBarLinks.style.display === "flex" && targetPathClass != "fa-solid fa-bars") {
      navBarLinks.style.display = "none";
    }
  })
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

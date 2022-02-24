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
  
  document.getElementById("search-button").onclick = () => {
    let searchForm = document.getElementById("search-form")
    let searchButton = document.getElementById("search-button")
    toggleDisplay(searchForm, searchButton)
  }

  document.getElementById("menu-button").onclick = () => {
    let navBarLinks = document.getElementById("navbar-links-container")
    toggleDisplay(navBarLinks)
  }

  
  const attackButton = document.getElementById("attack-button")
  
  attackButton.addEventListener("click", () => {
  let displayMemes = document.getElementById("display-memes")
  // document.getElementById("display-memes")
  if (displayMemes.style.display === 'none') {
    displayMemes.style.display = "block"
  }
  else {
    displayMemes.style.display = "none"
  }
})

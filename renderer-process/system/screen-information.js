const { remote } = require("electron")
const { screen } = remote

const screenInfoBtn = document.getElementById("screen-info")
const size = screen.getPrimaryDisplay().size

screenInfoBtn.addEventListener("click", () => {
  const message = `Your screen is: ${size.width}px x ${size.height}px`
  document.getElementById("got-screen-info").innerHTML = message
})

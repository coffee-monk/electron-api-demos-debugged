const settings = require("electron-settings")

document.body.addEventListener("click", event => {
  if (event.target.dataset.section) {
    handleSectionTrigger(event)
  } else if (event.target.dataset.modal) {
    handleModalTrigger(event)
  } else if (event.target.classList.contains("modal-hide")) {
    hideAllModals()
  }
})

// run interval until default section loads
const loadInterval = setInterval(() => {
  const defaultSectionId = "windows-section"
  if (document.getElementById(defaultSectionId)) {
    // Default to the view that was active the last time the app was open
    const sectionId = settings.get("activeSectionButtonId")
    if (sectionId) {
      const section = document.getElementById(sectionId)
      clearInterval(loadInterval)
      showMainContent()
      if (section) {
        section.click()
      }
    } else {
      activateDefaultSection()
      displayAbout()
    }
  }
}, 50)

// FUNCTIONS ----------------------------------------------

function handleSectionTrigger(event) {
  hideAllSectionsAndDeselectButtons()

  // Highlight clicked button and show view
  event.target.classList.add("is-selected")

  // Display the current section
  const sectionId = `${event.target.dataset.section}-section`

  console.log("sectionId: " + sectionId)
  console.log(document.getElementById(sectionId))
  document.getElementById(sectionId).classList.add("is-shown")

  // Save currently active button in localStorage
  const buttonId = event.target.getAttribute("id")
  console.log("buttonId: " + buttonId)
  settings.set("activeSectionButtonId", buttonId)
  console.log(settings.get("activeSectionButtonId"))
}

function activateDefaultSection() {
  console.log("activateDefaultSection")
  document.getElementById("button-windows").click()
}

function showMainContent() {
  console.log("js-nav")
  document.querySelector(".js-nav").classList.add("is-shown")
  document.querySelector(".js-content").classList.add("is-shown")
}

function handleModalTrigger(event) {
  hideAllModals()
  const modalId = `${event.target.dataset.modal}-modal`
  document.getElementById(modalId).classList.add("is-shown")
}

function hideAllModals() {
  const modals = document.querySelectorAll(".modal.is-shown")
  Array.prototype.forEach.call(modals, modal => {
    modal.classList.remove("is-shown")
  })
  showMainContent()
}

function hideAllSectionsAndDeselectButtons() {
  const sections = document.querySelectorAll(".js-section.is-shown")
  Array.prototype.forEach.call(sections, section => {
    section.classList.remove("is-shown")
  })

  const buttons = document.querySelectorAll(".nav-button.is-selected")
  Array.prototype.forEach.call(buttons, button => {
    button.classList.remove("is-selected")
  })
}

function displayAbout() {
  document.querySelector("#about-modal").classList.add("is-shown")
}

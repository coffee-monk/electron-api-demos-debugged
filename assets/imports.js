// const links = document.querySelectorAll('link[rel="import"]')
// Array.prototype.forEach.call(links, link => {
//   let template = link.import.querySelector(".task-template")
//   let clone = document.importNode(template.content, true)
//   if (link.href.match("about.html")) {
//     document.querySelector("body").appendChild(clone)
//   } else {
//     document.querySelector(".content").appendChild(clone)
//   }
// })

Array.from(document.querySelectorAll('link[rel="import"]')).forEach(link => {
  // console.log(link)
  fetch(link.href)
    .then(response => {
      return response.text()
    })
    .then(html => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")
      let template = doc.querySelector(".task-template")
      let clone = document.importNode(template.content, true)
      if (link.href.match("about.html")) {
        document.querySelector("body").appendChild(clone)
      } else {
        document.querySelector(".content").appendChild(clone)
      }
    })
})

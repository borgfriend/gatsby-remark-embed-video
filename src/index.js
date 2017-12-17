'use strict'
const visit = require(`unist-util-visit`)

module.exports = ({ markdownAST }, options = { width: 600, height: 300 }) => {
  function isUrlValid(userInput) {
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
    if (res == null) return false
    else return true
  }
  visit(markdownAST, `inlineCode`, node => {
    const { value } = node

    if (value.startsWith(`youtube:`)) {
      const videoUrl = value.substr(8)

      if (isUrlValid(videoUrl)) {
        node.type = `html`
        node.value = `
        <iframe 
          src="${videoUrl}"
          width="${options.width}" 
          height="${options.height}"
        />
        `
      }
    }
  })

  return markdownAST
}

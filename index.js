var sep = require('path').sep
var toString = require('mdast-util-to-string')

module.exports = checkTitle

function checkTitle (opts) {
  var title = (opts || {}).title
  return function checkTitleTransformer (root, file) {
    var filePath = (file.dirname === '.' ? file.cwd : file.dirname) || title || process.cwd();
    var dirnames = filePath.split(sep)
    var folder = dirnames[dirnames.length - 1].toLowerCase()
    var children = root.children
    var node = children[0]
    var replacement = {
      type: 'heading',
      depth: 1,
      children: [
        { type: 'text', value: folder }
      ]
    }

    // Replace heading if it is incorrect
    // Do nothing if it is fine
    if (node && node.type === 'heading') {
      var text = toString(node)
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim()

      if (text !== folder) {
        children[0] = replacement
      }
    // If it doesn't, splice it in
    } else {
      children.unshift(replacement)
    }

    return
  }
}

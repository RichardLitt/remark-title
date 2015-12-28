var sep = require('path').sep
var last = require('lodash').last
var toString = require('mdast-util-to-string')

module.exports = checkTitle

function checkTitle (remark, opts) {
  return function checkTitleTransformer (root, file) {
    var children = root.children
    var fileDir = last(file.directory.split(sep));
    var baseDir = last(__dirname.split(sep));
    var headingText = (opts && opts.title) ? opts.title : fileDir || baseDir
    var node = children[0]
    var title = {
      type: 'heading',
      depth: 1,
      children: [
        { type: 'text', value: headingText }
      ]
    }

    // Replace heading if it is incorrect
    // Do nothing if it is fine
    if (node && node.type === 'heading') {
      var text = toString(node)
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim()

      if (text !== headingText) {
        children[0] = title
      }
    // If it doesn't, splice it in
    } else {
      children = children.splice(0, 0, title)
    }

    return
  }
}

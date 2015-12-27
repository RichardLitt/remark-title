var last = require('lodash').last
var mdast = require('mdast')

module.exports = checkTitle

function checkTitle (mdast, opts) {
  return function checkTitleTransformer (root, file) {
    var children = root.children
    var headingText = (opts && opts.title) ? opts.title : last(__dirname.split('/'))
    var title = {
      type: 'heading',
      depth: 1,
      children: [
        { type: 'text', value: headingText }
      ]
    }

    // Replace heading if it is incorrect
    // Do nothing if it is fine
    if (children[0].type === 'heading') {
      var text = mdast.stringify({
        children: children[0].children,
        type: 'root'
      }).toLowerCase()
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

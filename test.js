const remark = require('remark')
const test = require('tape')
const diff = require('diff')
const plugin = require('./')
const fs = require('fs')

const fixtures = {
  'Does nothing if header is correct': 'fixtures/basic.md',
  'Replaces header if it is incorrect': 'fixtures/replace-title.md',
  'Adds a header if it is not present': 'fixtures/add-title.md'
}

const expected = {
  'Does nothing if header is correct': 'fixtures/basic-expected.md',
  'Replaces header if it is incorrect': 'fixtures/replace-title-expected.md',
  'Adds a header if it is not present': 'fixtures/add-title-expected.md'
}

test('remark-title', function (t) {
  Object.keys(fixtures).forEach(function (name) {
    var processor = remark().use(plugin)

    const actual = processor.processSync(fs.readFileSync(fixtures[name], 'utf8')).toString().trim()
    const expect = fs.readFileSync(expected[name], 'utf8').trim()

    t.equal(actual, expect, name)

    if (actual !== expect) {
      console.error(diff.diffChars(expect, actual))
    }
  })

  t.end()
})

test('remark-title with option', function (t) {
  var processor = remark().use(plugin, {
    title: 'remark-replace'
  })

  const actual = processor.processSync(fs.readFileSync('fixtures/basic-option.md', 'utf8')).toString().trim()
  const expect = fs.readFileSync('fixtures/replace-title.md', 'utf8').trim()

  t.equal(actual, expect, 'Replaces the title with the specified option')

  if (actual !== expect) {
    console.error(diff.diffChars(expect, actual))
  }

  t.end()
})

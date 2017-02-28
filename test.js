const remark = require('remark')
const test = require('tape')
const diff = require('diff')
const vfile = require('to-vfile')
const plugin = require('./')
const fs = require('fs')

const fixtures = [
  {
    name: 'Does nothing if header is correct',
    actual: 'fixtures/basic.md',
    expected: 'fixtures/basic-expected.md'
  },
  {
    name: 'Should use cwd without `dirname`',
    actual: 'fixtures/cwd.md',
    expected: 'fixtures/cwd-expected.md',
    raw: true
  },
  {
    name: 'Replaces header if it is incorrect',
    actual: 'fixtures/replace-title.md',
    expected: 'fixtures/replace-title-expected.md'
  },
  {
    name: 'Adds a header if it is not present',
    actual: 'fixtures/add-title.md',
    expected: 'fixtures/add-title-expected.md'
  },
  {
    name: 'Replaces the title with the specified option',
    actual: 'fixtures/basic-option.md',
    expected: 'fixtures/basic-option-expected.md',
    options: {title: 'Replace!'}
  }
]

test('remark-title', function (t) {
  fixtures.forEach(function (fixture) {
    var expect = vfile.readSync(fixture.expected).toString()
    var input = vfile.readSync(fixture.actual)
    var actual = remark()
      .use(plugin, fixture.options)
      .processSync(fixture.raw ? String(input) : input)
      .toString()

    t.equal(actual, expect, fixture.name)

    if (actual !== expect) {
      console.error(diff.diffChars(expect, actual))
    }
  });

  t.end()
})

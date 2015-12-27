# remark-title

![](http://img.shields.io/badge/stability-stable-orange.svg?style=flat)
![](http://img.shields.io/npm/v/remark-title.svg?style=flat)
![](http://img.shields.io/npm/dm/remark-title.svg?style=flat)
![](http://img.shields.io/npm/l/remark-title.svg?style=flat)

[mdast](https://github.com/wooorm/mdast) plugin to check and inject the title
of a markdown as the first element.

## Usage

[![NPM](https://nodei.co/npm/remark-title.png)](https://nodei.co/npm/remark-title/)

Used as a plugin for mdast like so:

```javascript
const plugin = require('remark-title')
const mdast  = require('mdast')

readme = mdast.use(plugin).process(readme)
```

This will add a title to your document if one is not already present.
The title will be the name of the folder, unless specified as an option.
If an existing title is different, it will replace it.

For example, the following input markdown:

```markdown
# Bogus Title

Hello World!
```

Would yield:

```markdown
# remark-title

Hello World!
```

### `options.title`

Optional. A string for a specified title.

## License

MIT. See [LICENSE.md](http://github.com/hughsk/remark-title/blob/master/LICENSE.md) for details.

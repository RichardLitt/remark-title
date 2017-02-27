# remark-title

![](http://img.shields.io/badge/stability-stable-orange.svg?style=flat)
![](http://img.shields.io/npm/v/remark-title.svg?style=flat)
![](http://img.shields.io/npm/dm/remark-title.svg?style=flat)
![](http://img.shields.io/npm/l/remark-title.svg?style=flat)

[remark](https://github.com/wooorm/remark) plugin to check and inject the title
of a markdown as the first element.

## Usage

[![NPM](https://nodei.co/npm/remark-title.png)](https://nodei.co/npm/remark-title/)

Used as a plugin for remark like so:

```javascript
const title = require('remark-title')
const remark  = require('remark')

readme = remark()
  .use(title, {title: 'remark-title'})
  .processSync(readme)
```

This will add a title to your document if one is not already present.
The title will be the name of the folder ([`VFile#dirname`](https://github.com/vfile/vfile#vfiledirname),
when available, or `process.cwd()`), unless specified as an option.
If an existing title is different (case-insensitive), it will replace it.

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

MIT. See [LICENSE.md](http://github.com/RichardLitt/remark-title/blob/master/LICENSE.md) for details.

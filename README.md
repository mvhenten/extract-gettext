extract-getext
==============

Extract gettext strings from `__('literal')` and `__n('single', 'plural', n )` functions in any source.
This module currently only looks for the `__` and `__n`. However, adding other signatures is trivial (see lex.js).

It does not do proper plurals - it just smashes everything into one flat structure.
When outputting a .json file, the format is usable by [i18n-conv](https://www.npmjs.org/package/i18next-conv).

## Install

    npm install extract-gettext
    
## Usage

### CLI

    extract-gettext -o strings.json /path/to/sources
    
### API

```javascript
    var scan = require('extract-gettext');

    scan(__dirname + '/../test/*', function(err, strings) {
        assert.deepEqual(strings, expect, 'Retrieved expected strings');
        assert.end();
    });
```


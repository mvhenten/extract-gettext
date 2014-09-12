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

( as taken from the "test" )

```javascript
    test('scanner', function(assert) {
        var expect = ['Plain old singluar',
          'as the other',
          'duplicate strings are filtered',
          'error, but it works',
          'even mixing goes',
          'like this',
          'one on the same line',
          'or that',
          'plural',
          'single'];
    
        scan(__dirname + '/../test/*', function(err, strings) {
            assert.deepEqual(strings, expect, 'Retrieved expected strings');
            assert.end();
        });
    });
```


extract-getext
==============

[![Build Status](https://drone.io/github.com/mvhenten/extract-gettext/status.png)](https://drone.io/github.com/mvhenten/extract-gettext/latest)

Extract gettext strings from `__('literal')` and `__n('single', 'plural', n )` functions in any source.
This module currently only looks for the `__` and `__n`. However, adding other signatures is trivial (see lex.js).

It does not do proper plurals - it just smashes everything into one flat structure, wich, actually, is similar to what the real `xgettext` does. 
When outputting a .json file, the format is usable by [i18next-conv](https://www.npmjs.org/package/i18next-conv).

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
## background

I wasn't going to write yet another variety of `xgettext`. `xgettext` has good support for javascript, and extracts strings faster then this tool.
However, I need a little bit of flexibility. `xgettext` is hardcoded for the `_('literal')` notation, a namespace usually occupied by `lodash` in my world.
As a small benefit, this small variety uses a simple lexer to extract translations, but it really doesn't care what programming language you've written your files in.

That may come in handy one day for coffeescript, typescript or even ES6.

Some other good tools exist, such as:

* [xgettext-js](https://github.com/Automattic/xgettext-js)
* [jsxgettext](https://github.com/zaach/jsxgettext)

## roadmap and future development

I'm propably not going to update this tool as it works for me and it works fast and decent enough. I have too little knowledge of the various .json and .po formats for pluralization and the "specs" seem a bit ambigious to me. However, maybe I misread something, so if you would like to use this and need this type of functionality, send me an example of the desired output format with some explaination :)


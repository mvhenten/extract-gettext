extract-getext
==============

[![Build Status](https://travis-ci.org/mvhenten/extract-gettext.svg?branch=master)](https://travis-ci.org/mvhenten/extract-gettext)

Extract gettext strings from `__('literal')` and `__n('single', 'plural', n )` functions in any source.
This module currently only looks for the `__` and `__n` function signatures.

The format produced by this package is similar to the output of `xgettext`, containing all strings in one flat array.
When outputting a .json file, the format is usable by [i18next-conv](https://www.npmjs.org/package/i18next-conv).

## Install

    npm install extract-gettext
    
## Usage

### CLI

    extract-gettext -o <output file> -x <exclude pattern> **/*.js
    
### API

( as taken from the "test" )

```javascript

    let scan = require("extract-gettext");

    function x(__, __n) {
        __('This is a singular translation %s', 'replacement');
        __('Plain old singluar');
        __n('single', 'plural', 1, 'cats');
        __n('error, but it works');
        __('one on the same line');
        __('as the other');
        __('even mixing goes');
        __n('like this', 'or that', 3);
        __('duplicate strings are filtered');
        __('duplicate strings are filtered');
        __('duplicate strings are filtered');
        __("Oh, and by the way: don't fail on this!");
        __('Oh, and by the way: this don\'t fly either!');
        __n('What\'s in a count', 'Won\'t you count it', 3);
        __('Accept (parenthesis) in a string');
        __n("we can have some (parenthesis)", "we can have one (parenthesis)", 3);
        __('a "string" can have quotes');
        __("a 'string' can have quotes");
        __("a string can \" mix a quote in various ways");
    }
    
    let strings = scan([__filename]);
    
    console.log(strings);
```
## background

The tool `xgettext` has good support for javascript, and extracts strings faster then this tool, but is hardcoced for the `_('literal')` notation.

Some other good tools exist, such as:

* [xgettext-js](https://github.com/Automattic/xgettext-js)
* [jsxgettext](https://github.com/zaach/jsxgettext)

## roadmap and future development

Please drop me a personal note on matthijsatischendotnl if you want to use this and I need to fix things.


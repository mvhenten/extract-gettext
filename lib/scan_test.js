'use strict';

const test = require('tape');
const scan = require('../index.js');
const assertDiff = require("assert-diff");

function dummyStrings() {
    var __ = function() {},
        __n = __;

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

test('scanner', function(assert) {
    var expect = [
        'Accept (parenthesis) in a string',
        'we can have some (parenthesis)',
        'we can have one (parenthesis)',
        'Oh, and by the way: don\'t fail on this!',
        "Oh, and by the way: this don\\'t fly either!",
        'Plain old singluar',
        'This is a singular translation %s',
        "What\\'s in a count",
        "Won\\'t you count it",
        'as the other',
        'duplicate strings are filtered',
        'error, but it works',
        "a \"string\" can have quotes",
        "a 'string' can have quotes",
        "a string can \\\" mix a quote in various ways",
        'even mixing goes',
        'like this',
        'one on the same line',
        'or that',
        'plural',
        'single',
        'replacement',
        'cats',
    ];


    let strings = scan([__filename]);

    assertDiff.deepEqual(strings.sort(), expect.sort(), 'Retrieved expected strings');
    assert.end();
});

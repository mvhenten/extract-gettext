'use strict';

var scan = require('../index.js'),
    test = require('tape');

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
}

test('scanner', function(assert) {
    var expect = [
        'Oh, and by the way: don\'t fail on this!',
        'Oh, and by the way: this don\'t fly either!',
        'Plain old singluar',
        'This is a singular translation %s',
        'What\'s in a count',
        'Won\'t you count it',
        'as the other',
        'duplicate strings are filtered',
        'error, but it works',
        'even mixing goes',
        'like this',
        'one on the same line',
        'or that',
        'plural',
        'single'
    ];

    scan(__dirname + '/../test/*', function(err, strings) {
        assert.deepEqual(strings.sort(), expect.sort(), 'Retrieved expected strings');
        assert.end();
    });
});

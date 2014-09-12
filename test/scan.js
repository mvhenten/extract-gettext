'use strict';

var scan = require('../index.js'),
    test = require('tape');

/**
 * This module is not picky so these strings will be picked up as well:
 *
 * __('This is a singular translation %s', 'replacement' );
 * __('Plain old singluar');
 * __n('single', 'plural', 1, 'cats' );
 * __n('error, but it works');
 * __('one on the same line') __('as the other');
 * __('even mixing goes'), __n('like this', 'or that', 3 );
 * __('duplicate strings are filtered');
 * __('duplicate strings are filtered');
 * __('duplicate strings are filtered');
 *
 */

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

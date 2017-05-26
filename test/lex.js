'use strict';

var tokenize = require('../lib/lex.js'),
    test = require('tape');

test('tokenize', function(assert) {


    assert.deepEqual(
        tokenize("<b>{{t 'username'}}</b>"),
        ['username']);

    assert.deepEqual(
        tokenize("<b>{{input placeholder=(t 'First name')}}</b>"),
        ['First name']);

    assert.deepEqual(
        tokenize("<b>{{task-members title=(t 'Task members') description=(t 'Members for this task')}}</b>"),
        ['Task members', 'Members for this task']);

    assert.deepEqual(
        tokenize("this.set('title', t`My Big Title`);"),
        ['My Big Title']);

    assert.deepEqual(
        tokenize("if (this.get('controllers.myProject.reviewMode')) {"),
        []);

    assert.end();
});

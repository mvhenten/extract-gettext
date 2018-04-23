const test = require("tape");
const lex = require("./lex");

test("it ignores quoted strings", assert => {
    const input = `"some quoted string", 'some quoted string'`;
    const result = lex(input);

    assert.deepEqual(result, []);
    assert.end();
});

test("It extracts __( with parenthesis", assert => {
    const str = `"not a  quote" __("one string (parentesis)")`;

    const result = lex(str);

    assert.deepEqual(result, [
        'one string (parentesis)',
    ]);

    assert.end();
});


test("It ignores escaped quotes", assert => {
    const x = (__) => {
        __("1. a string \"with\" quotes");
        __("2. a string 'with' quotes");
        __('3. a string \'with\' quotes');
        __('4. a string "with" quotes');
        __(`5. a string 'with', "some", quotes, \`even this\``);
        __(`6. a string with a literal \` and not closing it`);
        __(`7. a string with a literal " and not closing it`);
        __(`8. a string with a literal ' and not closing it`);
    };

    const result = lex(x.toString());

    assert.deepEqual(result, ['1. a string \\"with\\" quotes',
        '2. a string \'with\' quotes',
        '3. a string \\\'with\\\' quotes',
        '4. a string "with" quotes',
        '5. a string \'with\', "some", quotes, \\`even this\\`',
        '6. a string with a literal \\` and not closing it',
        '7. a string with a literal " and not closing it',
        '8. a string with a literal \' and not closing it'
    ]);

    assert.end();
});

test("It extracts __n( with parenthesis", assert => {
    const str = `"not a  quote" __n("one string (parentesis)", "some strings (parenthesis)", 2)`;

    const result = lex(str);

    assert.deepEqual(result, [
        'one string (parentesis)',
        'some strings (parenthesis)'
    ]);

    assert.end();
});
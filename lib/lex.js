'use strict';

var Lexer = require('lex');

function extract(lexeme) {
    var str = '',
        quoteChar = null;

    for (var i = 0, len = lexeme.length; i < len; i++) {
        var c = lexeme[i];

        if (!quoteChar && /["'`]/.test(c)) {
            quoteChar = c;
            continue;
        }

        if (c === quoteChar && lexeme.charAt(i - 1) !== '\\') break;
        if (quoteChar) str = str + c;
    }

    return str;
}

function unescape(str) {
    return str.replace(/\\'/, '\'');
}

module.exports = function tokenize(source) {
    var tokens = [],
        lexer = new Lexer(function() {});

    // {{t 'Translate me'}}
    lexer.addRule(/\{\{t.+?\s*\}\}/g, function(lexeme) {
        var str = extract(lexeme);
        tokens.push(unescape(str));
    }, []);

    // {{input placeholder=(t 'Translate me')}}
    lexer.addRule(/\(t.+?\s*\)/g, function(lexeme) {
        var str = extract(lexeme);
        tokens.push(unescape(str));
    }, []);

    // t`Translate me`
    lexer.addRule(/t\`.+?\`/g, function(lexeme) {
        var str = extract(lexeme);
        tokens.push(unescape(str));
    }, []);

    lexer.setInput(source);
    lexer.lex();

    return tokens;
};

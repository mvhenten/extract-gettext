'use strict';

var Lexer = require('lex');

function unquote( str  ) {
    return str.substr( 1, str.length - 2 );
}

module.exports = function tokenize(source) {
    var tokens = [],
        lexer = new Lexer(function() {});
        
    lexer.addRule(/__\(['"].+?['"]\)/g, function (lexeme) {
        var match = lexeme.match(/['"].+?['"]/g),
            str = match[0];
        
        tokens.push( unquote( str ) );        
    }, []);
    
    lexer.addRule(/__n\(.+?\)/g, function (lexeme) {
        var strings = lexeme.match(/['"].+?['"]/g);
        
        strings.slice(0,2).forEach(function(str){
          tokens.push( unquote( str ) );
        });
    }, []);

    lexer.setInput(source);
    lexer.lex();

    return tokens;
};

const Lexer = require('lex');

module.exports = function tokenize(source) {
    let tokens = [];
    let lexer = new Lexer(() => {});

    let quote = "";
    let token = "";

    lexer.addRule(/__\(/g, function(lexeme) {
        this.reject = true;
        this.state = 2;
    }, [0]);

    lexer.addRule(/__n\(/g, function(lexeme) {
        this.reject = true;
        this.state = 2;
    }, [0]);

    lexer.addRule(/\)/, function(lexeme) {
        this.reject = true;
        lexer.state = 0;
    }, [2]);


    lexer.addRule(/[`'"]/, function(lexeme) {
        this.reject = true;

        switch (this.state) {
            case 2:
                quote = lexeme;
                this.state = 4;
                return;

            case 4:
                if (lexeme !== quote)
                    return;

                let context = source.slice(this.index - 2, this.index);

                if (/[\\][`'"]/.test(context))
                    return;

                this.state = 2;
                tokens.push(token);
                token = "";
                break;
        }
    }, [2, 4]);

    lexer.addRule(/./, function(lexeme) {
        if (this.state != 4) return;
        token += lexeme;
    }, [4]);

    lexer.setInput(source);
    lexer.lex();

    return tokens;
};

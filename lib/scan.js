'use strict';

const fs = require("fs");
const lex = require("./lex");
const debug = require("debug")("extract-gettext");

function scan(files) {
    let tokens = new Set();
    
    for (let file of files) {
        if (!fs.statSync(file).isFile())
            continue;

        debug(file);

        let src = fs.readFileSync(file);
        let strings = lex(src.toString());

        if (!strings)
            continue;

        strings.forEach(str => tokens.add(str));
    }

    return Array.from(tokens).sort();

}

module.exports = scan;

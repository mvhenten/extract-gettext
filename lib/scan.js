'use strict';

var glob = require('glob'),
    _ = require('lodash'),
    async = require('async'),
    fs = require('fs'),
    lex = require('./lex');

function isFile(path) {
    var stat = fs.statSync(path);
    return stat.isFile();
}

function getStrings(path, done) {
    glob(path, function(er, files) {
        var tokens = [];

        files = files.filter(isFile);

        async.reduce(files, tokens, function(tokens, file, next) {
            fs.readFile(file, function(err, src) {
                if (err) return next();
                if (src.length === 0) return next();

                tokens = tokens.concat(lex(src.toString()));

                return next(null, tokens);

            });
        }, done);
    });
}

function scan(path, done) {
    getStrings(path, function(err, results) {
        var strings = [];

        if (err) return done(err, strings);

        strings = results.reduce(function(strings, result) {
            return strings.concat(result);
        }, []);

        return done(null, _.uniq(strings).sort());
    });
}

module.exports = scan;

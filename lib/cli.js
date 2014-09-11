'use strict';

var program = require('commander'),
    _ = require('lodash'),
    fs = require('fs'),
    async = require('async'),
    scan = require('./scan');
    
function run( program, source ){
    var paths = source.split(',').map(function(path){
        return path + '/**/*';
    });
    
    async.map( paths, scan, function( err, results ){
        var strings = results.reduce(function( strings, result ){
            return strings.concat( result );
        }, [] );
        
        strings = _.uniq(strings).sort().reduce(function( strings, string ){
            strings[string] = string;
            return strings;
        }, {});
        
        if ( program.output ) return fs.writeFile( program.output, JSON.stringify( strings, null, 2 ), process.exit );
        
        console.log( JSON.stringify( strings, null, 2 ) );        

        return process.exit();
    });    
}

program
    .command('*')
    .description('Scans for gettext functions __("literal") and __n("single", "plural", n )')
    .action(function( source ) {
        run( program, source );        
    });


program
  .version('0.0.1')
  .option('-o, --output [file]', 'Output file', String )
  .parse(process.argv);

if( program.args.length === 0 ) program.help();

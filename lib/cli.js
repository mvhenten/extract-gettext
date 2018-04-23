#! /usr/bin/env node

const yargs = require("yargs");
const fs = require("fs");
const scan = require("../lib/scan");

function main() {
    const argv = yargs
        .usage("Usage: $0 -o [output] -x [exclude]")
        .describe("o", "Output file")
        .alias("o", "output")
        .describe("x", "Exclude pattern")
        .alias("x", "exclude")
        .demandCommand(1)
        .argv;
        
    let files = argv._;
    
    if (argv.exclude) {
        let re = new RegExp(argv.exclude);
        files = files.filter(v => !re.test(v));
    }

    const strings = scan(files);

    if (argv.output) {
        fs.writeFile(argv.output, JSON.stringify(strings, null, 2), process.exit);
        return;
    }
    console.log(JSON.stringify(strings, null, 2));
}

main();
const fs = require('fs');
const buffer = require('buffer');
const path = require('path');

// decode base64
const btoa = str => Buffer.from(str, 'base64').toString();

const f = async () => {
    // get an array of file names
    const files = fs.readdirSync("./files");
    // create a "hasmap" of filenames and decoded names
    const mapOfFiles = new Map();
    // loop over them to fill the map with converted keys
    files.forEach(filename => {
        // our decoded filename
        const order = btoa(filename)
        // set into map
        mapOfFiles.set(order, filename);
    });

    // get the keys of map via Map.keys
    // which returns an iterable function
    // so we create an array with it.
    const keys = Array.from(mapOfFiles.keys());
    // sorting keys array with numbers.

    const ordered = keys.sort((a, b) => {
        return a-b;
    });

    // loop over the properly sorted keys array
    ordered.forEach(key => {
        // get the ordered value from the map
        const currentFileName = mapOfFiles.get(key);
        // read file contents, convert returned file buffer to string
        const filecontents = fs.readFileSync(path.resolve(`files/${currentFileName}`)).toString();
        
        console.log(filecontents);
    })
    
};

// call the function
f();
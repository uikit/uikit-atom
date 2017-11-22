/* eslint no-console: 0 */
var fs = require('fs');
var current = require('../completions.json');

// file paths
var css = 'uikit/dist/css/uikit.css';
var js = 'uikit/dist/js/uikit.js';

if (!fs.existsSync(css) || !fs.existsSync(js)) {
    console.log('Can\'t locate UIkit files.');
}

var list = merge(
        read(css).match(/\.uk-[a-z\d-]+/g).map(cls => cls.substr(1)),
        read(js).match(/uk-[a-z\d-]+/g)
    );

list.forEach(item => !~current.indexOf(item) && console.log('added:', item));
current.forEach(item => !~list.indexOf(item) && console.log('removed:', item));

fs.writeFileSync('completions.json', JSON.stringify(list, null, 4));
console.log('Done.');

function merge(...arr) {
    return Array.from(
        new Set(
            Array.prototype.concat.apply(arr[0], arr.slice(1))
        )
    ).sort();
}

function read(file) {
    return fs.readFileSync(file).toString();
}

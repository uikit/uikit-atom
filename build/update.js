/* eslint no-console: 0 */
var fs = require('fs');
var current = require('../completions.json');
// file paths
var fname_css = 'uikit/dist/css/uikit.css';
var fname_js = 'uikit/dist/js/uikit.js';
var outfile = 'completions.json';

function remove_duplicates(arr) {
    var _set = {};
    arr.forEach(function(el) { _set[el] = true; });
    return Object.keys(_set);
}

// classes: uk-* from CSS
function css() {
    var src = fs.readFileSync(fname_css).toString();
    var classes = src.match(/\.(uk-[a-z\d\-]+)/g);
    classes = remove_duplicates(classes).map(function(cls) { return cls.substr(1); }); // remove leading dot

    return classes;
}

// attributes: uk-* from JS
function js() {
    var src = fs.readFileSync(fname_js).toString();
    var attrs = src.match(/uk-[a-z\d\-]+/g);
    return remove_duplicates(attrs);
}

function atom() {
    var _css = css(),
        _js = js(),
        lst = _css.concat(_js);

    lst = remove_duplicates(lst);

    lst = lst.sort((a, b) => a < b ? -1 : 1);

    lst.forEach(cls => {
        if (current.indexOf(cls) < 0) {
            console.log('added:', cls);
        }
    });
    current.forEach(cls => {
        if (lst.indexOf(cls) < 0) {
            console.log('removed:', cls);
        }
    });

    fs.writeFileSync(outfile, JSON.stringify(lst, null, 4));
    console.log('Done.');
}

if (fs.existsSync(fname_css) && fs.existsSync(fname_js)) {
    atom();
} else {
    console.log("Can't locate UIkit files");
}
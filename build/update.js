var fs = require('fs');

// file paths
var fname_css = "uikit/dist/css/uikit.css";
var fname_js = "uikit/dist/js/uikit.js";
var outfile = "lib/html.complete.json";

if (!fs.existsSync(fname_css) || !fs.existsSync(fname_js)) {
    console.log("Can't locate UIkit files");
    return;
}

// returns the array with all duplicate elements removed
function remove_duplicates(arr) {
    var _set = {};
    arr.forEach(function(el) { _set[el] = true; });
    return Object.keys(_set);
}

// classes: uk-* from CSS
function css() {
    var src     = fs.readFileSync(fname_css).toString(),
        classes = src.match(/\.(uk-[a-z\d\-]+)/g),
        classes = remove_duplicates(classes).map(function(cls) { return cls.substr(1); }); // remove leading dot

    return classes;
}

// attributes: uk-* from JS
function js() {
    var src   = fs.readFileSync(fname_js).toString(),
        attrs = src.match(/uk-[a-z\d\-]+/g),
        attrs = remove_duplicates(attrs);
    return attrs;
}

function atom() {
    var _css = css(),
        _js  = js(),
        lst = _css.concat(_js),
        obj = { ".text.html, .source.jade, .text.css, .source.js, .text.html.php, .source.php": {
                "editor": { "completions": lst }}};

    fs.writeFileSync(outfile, JSON.stringify(obj, null, 4));
    console.log("Done.");
}

atom();

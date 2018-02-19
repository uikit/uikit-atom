const completions = require('../completions.json');

module.exports = {

    selector: '.text.html, .source.jade, .text.css, .source.js, .text.html.php, .source.php',
    disableForSelector: '.comment',
    filterSuggestions: false,
    suggestionPriority: 2,
    getSuggestions({ prefix }) {

        if (prefix.length >= 3 || prefix === 'uk') {
            return completions.filter(p => p.indexOf(prefix) >= 0)
                              .map(text => ({ text, replacementPrefix: prefix }));
        }
    }

};
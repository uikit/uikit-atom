fs = require 'fs'
path = require 'path'

properties = {}

module.exports =
  selector: '.text.html, .source.jade, .text.css, .source.js, .text.html.php, .source.php'
  disableForSelector: '.comment'

  # Tell autocomplete to fuzzy filter the results of getSuggestions()
  filterSuggestions: true

  # appear before the default provider, which has a suggestionPriority of 1.
  suggestionPriority: 2

  getSuggestions: ({editor, bufferPosition, scopeDescriptor, prefix, activatedManually}) ->

    if prefix.length < 3
      return

    completions = properties.filter (p) -> p.match prefix
    return completions.map (c) -> { text: c }

  loadProperties: ->
    fs.readFile path.resolve(__dirname, '..', 'completions.json'), (error, content) =>
      properties = JSON.parse(content) unless error?
      return

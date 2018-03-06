var fs = require("fs");
var path = require("path");
var process = require("process");
var xml2js = require("xml2js");

/**
 * @param {string} fileName 
 */
function init (fileName) {
  var parser = new xml2js.Parser();

  fs.readFile(fileName, function (err, data) {
    parser.parseString(data, function (err, result) {
      var chars = result.font.chars[0].char;
      var parsedChars = {};

      for (var i = 0; i < chars.length; i++) {
        var char = chars[i].$;
        parsedChars[char.id] = char;

        for (var key in parsedChars[char.id]) {
          parsedChars[char.id][key] = parseInt(parsedChars[char.id][key], 10);
        }
      }

      var fileContents = JSON.stringify(parsedChars, null, "  ");
      var filePath = path.join(__dirname, fileName.replace("fnt", "json"));

      fs.writeFile(fileName.replace("fnt", "json"), fileContents, function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log("font data here: " + filePath);
        }
      });
    });
  });
}

init(process.argv[2]);

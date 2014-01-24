var fs = require('fs'),
path = require('path');
Parse = require('../lib/parser');

var V = function(options, callback) {
  // when a view file is not specified, search for a
  // console.log(__dirname);
  var view_file = path.resolve('../viu/test/views/'+options.view+'.html');
  // console.log(view_file);
  fs.readFile(view_file, 'utf8', function (err,viewstr) {
    if (err) {
      console.log(err);
      // return console.log(err);
    }
    Parse(options, viewstr, function(err, str){ 
      callback(null, str); 
    });
  });
}

module.exports = V;

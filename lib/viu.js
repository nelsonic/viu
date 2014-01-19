var fs = require('fs'),
path = require('path');

var V = function(options, callback) {
  // when a view file is not specified, search for a
  // console.log(__dirname);
  var view_file = path.resolve('../viu/test/views/'+options.view+'.html');
  // console.log(view_file);
  fs.readFile(view_file, 'utf8', function (err,data) {
    if (err) {
      console.log(err);
      // return console.log(err);
    }
  	// console.log(data);
  	callback(null, data);	
  });
};

module.exports = V;

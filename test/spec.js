var assert = require('assert'),
fs = require('fs'),
path = require('path'),
V = require('../lib/viu');

// an html file without any variables
var options = {};
options.view = 'no_variables';
var view_file = path.resolve('../viu/test/views/'+options.view+'.html');

html = fs.readFileSync(view_file, 'utf8')
V(options, function(err, data){
		// console.log(data)
		assert.equal(data, html);
});




// assert.equal(true, false);

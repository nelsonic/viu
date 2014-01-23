var assert = require('assert'),
fs = require('fs'),
path = require('path'),
V = require('../lib/viu');
var check = "\u2713"; // http://www.fileformat.info/info/unicode/char/2713

// an html file without any variables
var options = {};
options.view = 'no_variables';
var view_file = path.resolve('../viu/test/views/'+options.view+'.html');

html = fs.readFileSync(view_file, 'utf8')
V(options, function(err, data){
		// console.log(data)
		assert.equal(data, html);
		console.log("Simple View Without Variables "+check);
});

// test simple placeholder substitution
Parse = require('../lib/parser');
options = {
	cat: "Clever Cat",
	hat: "Top Hat"
};
var str = "The {cat} with in the { hat } sat on the mat."
Parse(options, str, function(rendered){
	var expected = "The Clever Cat in the Top Hat sat on the mat."
	assert.equal(rendered, expected);
	console.log("Simple Variable Substitution "+check);
});


'use strict';
var assert = require('assert');
var fs     = require('fs');
var path   = require('path');
var viu    = require('../lib/viu');
var Parser = require('../lib/parser');
var check  = "\u2713"; // http://www.fileformat.info/info/unicode/char/2713

// an html file without any variables
(function() {

	var options = {};
	options.view = 'no_variables';
	var view_file = path.resolve('../viu/test/views/'+options.view+'.html');

	var html = fs.readFileSync(view_file, 'utf8');
	viu(options, function(err, novars) {
			// console.log(data)
			assert.equal(novars, html);
			console.log("Viu:Simple View Without Variables "+check);
		});
}());

(function() {
	// test simple placeholder substitution
	var options = {
		cat: "Clever Cat",
		hat: "Top Hat"
	},
	str = "The {cat} in the { hat } sat on the mat."; // whitespace optional
	Parser(options, str, function(err, rendered){
		var expected = "The Clever Cat in the Top Hat sat on the mat.";
		assert.equal(rendered, expected);
		console.log("Parser:Simple Variable Substitution "+check);
	});
})();

(function() {
	// an html file WITH basic variables
	var options = {};
	options.view = 'basic_variables';
	options.title = "Basic Variables";
	options.name  = "Girl";
	var view_file = path.resolve('../viu/test/views/'+options.view+'.html');

	var html = fs.readFileSync(view_file, 'utf8');

	viu(options, function(err, data){
		Parse(options, html, function(err, parsedstr){
			assert.equal(data, parsedstr);
			console.log("Viu:Simple View With Variables "+check);
		});
	});
}());

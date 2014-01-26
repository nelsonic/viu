var assert = require('assert'),
fs    = require('fs'),
path  = require('path'),
V     = require('../lib/viu'),
Parse = require('../lib/parser');
check = "\u2713"; // http://www.fileformat.info/info/unicode/char/2713

(function(){
	// an html file without any variables
	var options = {};
	options.view = 'no_variables';
	var view_file = path.resolve('../viu/test/views/'+options.view+'.html');

	html1 = fs.readFileSync(view_file, 'utf8')
	V(options, function(err, novars){
			// console.log(data)
			assert.equal(novars, html1);
			console.log("Viu:Simple View Without Variables "+check);
	});
}());

(function(){
	// test simple placeholder substitution
	var options = {
		cat: "Clever Cat",
		hat: "Top Hat"
	},
	str = "The {cat} in the { hat } sat on the mat." // whitespace optional
	Parse(options, str, function(err, rendered){
		var expected = "The Clever Cat in the Top Hat sat on the mat."
		assert.equal(rendered, expected);
		console.log("Parser:Simple Variable Substitution "+check);
	});
})();

(function(){
	// an html file WITH basic variables
	var options = {};
	options.view = 'basic_variables';
	options.title = "Basic Variables"
	options.name  = "Girl"
	var view_file = path.resolve('../viu/test/views/'+options.view+'.html');

	html = fs.readFileSync(view_file, 'utf8');

	V(options, function(err, data){
		Parse(options, html, function(err, parsedstr){
			assert.equal(data, parsedstr);
			console.log("Viu:Simple View With Variables "+check);
		})
	});
}());

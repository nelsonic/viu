var Replace = function(options, str, matches, callback) {
  matches.forEach( function(entry) {
    console.log("Dirty: "+entry);
    entry.replace(/^{\s+}$/g, '');
    console.log("Clean: "+entry);

  });
}

var Parse = function(options, str, callback){
  var pattern = /{[0-9\-A-Za-z\s]+}/gi;
  var match, matches = [];
  while ( (match = pattern.exec(str)) ) {
      matches.push(match[0]);
  }
  matches.forEach( function(entry) {
    // console.log("Dirty: "+entry);
    entry = entry.replace(/\{|\s+|\}/g, ''); // strip open curly, any space and close curly
    // console.log("Clean: "+entry);
    if(options.hasOwnProperty(entry)){
      // console.log("Replace with >> "+options[entry]);
      var start = "\\{\\s*";
      var end   = "\\s*\\}";
      var regEx = new RegExp(start+entry+end, 'gi');
      // console.log(regEx);
      str = str.replace(regEx, options[entry]);
      // console.log(str);
    }
  });

  callback(str);
}




// options = {
//   cat: "Clever Cat",
//   hat: "Top Hat"
// };
// var str = "The {cat} in the { hat } sat on the mat."
// Parse(options, str, function(rendered){
//   console.log(rendered);
// });





module.exports = Parse;


/*
var myText = "visit homepage expect body"; // Input text
var lines = myText.split("\n");
var numLines = lines.length;
var i;
var currentSection;
var sections = Array();
var phrases = Array();

// parse phrases
for (i = 0; i < numLines; i++) {
  var line = lines[i];
  if (line.indexOf('@') == 1) {
    // start of e.g. time section, handled in nex loop
    break;
  } else {
    // phrase
    phrase.push(line);
  }
}

// parse sections
for ( ; i < numLines; i++) {
  var line = lines[i];
  if (line.indexOf('@') == 1) {
    // start of next section, handled in nex loop
    currentSection = line;
    sections[currentSection] = new Array();
  } else {
    // add section entry
    sections[currentSection].push(line);
  }
}
*/
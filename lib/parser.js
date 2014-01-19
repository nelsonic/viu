
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
var Replace = function(options, str, matches, callback) {
  matches.forEach( function(entry) {
    console.log("Dirty: "+entry);
    entry.replace(/^{\s+}$/g, '');
    console.log("Clean: "+entry);

  });
}

var Parse = function(options, str, callback){
  var pattern = /{[0-9\-A-Za-z\s]+}/gi, 
  match, matches = [], err;
  if(str.indexOf('{')){
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
  }

  callback(err, str);
}

module.exports = Parse;
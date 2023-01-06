const express = require('express');
const sprintfJS = require('sprintf-js');
const app = express();

app.use(express.json());

var pathPrefix = process.env.PATH_PREFIX;
var debugEnv = process.env.FILTER_DEBUG;

if (debugEnv == null) {
  filterDebug = false;
} else {
  filterDebug = debugEnv;
}

var prefixes = pathPrefix.split(",");

for (prefixCount = 0; prefixCount < prefixes.length; prefixCount++) {
  prefixes[prefixCount] = prefixes[prefixCount].trim();
}

var port = 8080;

console.log("Path prefixes : " + prefixes);
console.log("Filter debug " + filterDebug);

console.log("Application is starting......");
var counter = 0;

app.post('/', (request, response) => {
  counter++;

  var modified = [];

  console.log("trigger ... " + counter);

  var jsonObj = JSON.stringify(request.body.commits);

  // console.log(request.body.commits);

  var commits = JSON.parse(jsonObj);

  for (count = 0; count < commits.length; count++) {
    var modified_files= commits[count].modified;
    var added_files = commits[count].added;
    var removed_files = commits[count].removed;
    if (filterDebug) {
      console.log ("modified : " + modified_files);
      console.log ("added : " + added_files);
      console.log ("removed : " + removed_files);

      console.log(modified_files + " " + modified_files.length);
    }

/*    if (modified_files.length > 0) {
      filelist += modified_files;
    }
    if (added_files.length > 0) {
      if (filelist.length > 0) {
        filelist += "," + added_files;
      } else {
        filelist = added_files;
      }
    }
    if (removed_files.length > 0) {
      if (filelist.length > 0) {
        filelist += "," + removed_files;
      } else {
        filelist = removed_files;
      }
    }
*/


    var split_filelist = filelist.toString().split(',');
    for (modified_counter = 0; modified_counter < split_filelist.length; modified_counter++) {
      modified.push(split_modified[modified_counter]);

    }    
  }

  if (filterDebug) {
    console.log(modified);
  }

  match = false;

  for (count = 0; count < modified.length; count++) {
    for (prefixCount = 0; prefixCount < prefixes.length; prefixCount++) {
      if (filterDebug) {
        console.log ("compare : " + modified[count] + " with " + prefixes[prefixCount]);
      }
      if (modified[count].startsWith(prefixes[prefixCount])) {
        if (filterDebug) {
          console.log("matched");
        }
        match = true;
      }
    }
  }

  console.log(match);

  response.send("ok" + "\n");
});

console.log("Listening on port " + port);
app.listen(port, () => console.log("Listening on port " + port));
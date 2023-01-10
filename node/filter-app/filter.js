const express = require('express');
const sprintfJS = require('sprintf-js');
const app = express();

app.use(express.json());

var pathPrefix = process.env.PATH_PREFIX;
var debugEnv = process.env.FILTER_DEBUG;

if (debugEnv == null) {
  filterDebug = false;
} else {
  if (debugEnv.toLowerCase() == 'false') {
    filterDebug = false;
  } else {
    filterDebug = true;
  }
}

var prefixes = pathPrefix.split(",");

for (prefixCount = 0; prefixCount < prefixes.length; prefixCount++) {
  prefixes[prefixCount] = prefixes[prefixCount].trim();
}

var port = 8080;

console.log("Path prefixes : " + prefixes);
console.log("Filter debug " + filterDebug);

console.log("Application is starting....");
var counter = 0;

app.post('/', (request, response) => {
  counter++;

  var filelist = [];

  console.log("trigger ... " + counter);

  var jsonCommitsObj = JSON.stringify(request.body.commits);
  var jsonFullObj = JSON.stringify(request.body);

  var fullObj = JSON.parse(jsonFullObj);

  console.log("Repository : " + fullObj.repository.clone_url);

  console.log("Pusher : " + fullObj.pusher.name);

  // console.log(request.body.commits);

  var commits = JSON.parse(jsonCommitsObj);

  for (count = 0; count < commits.length; count++) {
    var modified_files= commits[count].modified;
    var added_files = commits[count].added;
    var removed_files = commits[count].removed;

    console.log("Commit ID      : " + commits[count].id);
    console.log("Committer      : " + commits[count].committer.name);
    console.log("Commit Message : " + commits[count].message);

    if (filterDebug == true) {
      console.log ("modified : " + modified_files);
      console.log ("added : " + added_files);
      console.log ("removed : " + removed_files);
    }

    var split_modified_files = modified_files.toString().split(',');
    if (split_modified_files.length > 0) {
      for (modified_counter = 0; modified_counter < split_modified_files.length; modified_counter++) {
        if (split_modified_files[modified_counter].length > 0) {
          if (filterDebug == true) {
            console.log("M : pushing : " + split_modified_files[modified_counter]);
          }
          filelist.push(split_modified_files[modified_counter]);
        }
      }
    }

    var split_added_files = added_files.toString().split(',');
    if (split_added_files.length > 0) {
      for (added_counter = 0; added_counter < split_added_files.length; added_counter++) {
        if (split_added_files[added_counter].length > 0) {
          if (filterDebug == true) {
            console.log("A : pushing : " + split_added_files[added_counter]);
          }
          filelist.push(split_added_files[added_counter]);
        }
      }
    }
    var split_removed_files = removed_files.toString().split(',');
    if (split_removed_files.length > 0) {
     for (removed_counter = 0; removed_counter < split_removed_files.length; removed_counter++) {
       if (split_removed_files[removed_counter].length > 0) {
         if (filterDebug == true) {
           console.log("R : pushing : " + split_removed_files[removed_counter]);
         }
         filelist.push(split_removed_files[removed_counter]);
       }
     }
    }
  }

  if (filterDebug == true) {
    console.log("---------------------------------------------------------");
    console.log("Files for comparison");
    console.log("---------------------------------------------------------");
    console.log(filelist);
  }

  match = false;

  for (count = 0; count < filelist.length; count++) {
    for (prefixCount = 0; prefixCount < prefixes.length; prefixCount++) {
      if (filterDebug == true) {
        console.log ("compare : " + filelist[count] + " with " + prefixes[prefixCount]);
      }
      if (filelist[count].startsWith(prefixes[prefixCount])) {
        if (filterDebug == true) {
          console.log("matched");
        } else {
          console.log("match on : " + filelist[count])
        }
        match = true;
      }
    }
  }

  console.log(match);

  if (match == true) {
    response.send(request.body);
  } else {
    response.status(404).send("do not trigger a build for this git push");
  }
});

app.listen(port, () => console.log("Listening on port " + port));

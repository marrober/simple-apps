const http = require('http');
const express = require('express');
const sprintfJS = require('sprintf-js');
const app = express();

/* API endpoints .......................
    /             - Get the IP address of the current layer.
*/

const port = 8080;

console.log("Application is starting......");
console.log("This app name : app-1");

app.get('/', (request, response) => {
  messageText = sprintfJS.sprintf("This is app-1");
  console.log("", messageText);
  response.send(messageText + "\n");
});

app.listen(port, () => console.log("phase: setup", "Listening on port " + port));


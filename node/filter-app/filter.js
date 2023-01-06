const http = require('http');
const express = require('express');
const sprintfJS = require('sprintf-js');
var ip = require("ip");
const app = express();

var pathPrefix = process.env.PATH_PREFIX;

var port = 8080;

console.log("phase: setup", "This app target port : " + port);
console.log("phase: setup", "This app ip address  : " + ip.address());

console.log("Application is starting......");
var counter = 0;

app.post('/', (request, response) => {
  counter++;
  messageText = sprintfJS.sprintf("this ip address %-15s  %04d", ip.address(), counter);
  console.log("phase: root", messageText);
  response.send(messageText + request.body + "\n");
});

console.log("Listening on port " + port);
app.listen(port, () => console.log("phase: setup", "Listening on port " + port));
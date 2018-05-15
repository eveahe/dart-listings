// server.js
// where the node app starts

// init project
var express = require('express');
var app = express();
var GoogleSpreadsheets = require("google-spreadsheets");
var events;

//Loading data from Google Sheet
GoogleSpreadsheets({
    key: "1x1MvUF-dr_kuAMwAa9pLixZHdyoZD_HXI8YW-01KiQY"
}, function(err, spreadsheet) {
    console.log("testing this out too");
    spreadsheet.worksheets[0].cells({
    }, function(err, result) {
    	// Put in-memory store for now
      events = result.cells;
    });
});

function myFunction () {
    console.log('Executed!');
}

var interval = setInterval(function () { myFunction(); }, 60000);

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/events", function (request, response) {
  response.send(events);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

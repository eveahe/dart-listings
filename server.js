// init project
var express = require('express');
var app = express();
var GoogleSpreadsheets = require("google-spreadsheets");
var async = require('async');
var events;
var nycevents;
var berlinevents; 

var berlinkey="1oPJ2H__lulbYlgZge_sav5rEKEAxDLocgw9dHvUC09A"
var nyckey="1x1MvUF-dr_kuAMwAa9pLixZHdyoZD_HXI8YW-01KiQY"

//Loading data from Google Sheet
GoogleSpreadsheets({
    key: "1x1MvUF-dr_kuAMwAa9pLixZHdyoZD_HXI8YW-01KiQY"
}, function(err, spreadsheet) {
    spreadsheet.worksheets[0].cells({
    }, function(err, result) {
    	// Put in-memory store for now
      events = result.cells;
    });
    spreadsheet.worksheets[1].cells({
    }, function(err, result) {
    	// Put in-memory store for now
      berlinevents = result.cells;
    });


});

//This should then check the API once a minute...I need to clean this bizness up.
setInterval(function gs(){ 
  GoogleSpreadsheets({
    key: "1x1MvUF-dr_kuAMwAa9pLixZHdyoZD_HXI8YW-01KiQY"
}, function(err, spreadsheet) {
    spreadsheet.worksheets[0].cells({
    }, function(err, result) {
    	// Put in-memory store for now
      console.log("Just checking for NYC updates over here.");
      events = result.cells;
    });
    spreadsheet.worksheets[1].cells({
    }, function(err, result) {
    	// Put in-memory store for now
      console.log("Just checking for Berlin updates over here.");
      berlinevents = result.cells;
    });
});
}, 60000);

app.use(express.static(__dirname + '/public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/berlin", function (request, response) {
  response.sendFile(__dirname + '/views/berlin.html');
});

app.get("/events", function (request, response) {
  response.send(events);
});

app.get("/berlinevents", function (request, response) {
  response.send(berlinevents);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// server.js
// where the node app starts

// init project
var express = require('express');
var app = express();
var GoogleSpreadsheets = require("google-spreadsheets");
var charts;

//
// Step 1: Loading the Data
// This uses samcday's [Google Spreadsheet Data API for Node](https://github.com/samcday/node-google-spreadsheets).
// It's a simple node.js library that makes it easy for us to read data from a Google Spreadsheet. To keep things
// straight-forward, in our example, we're reading data from a [public spreadsheet](https://docs.google.com/spreadsheets/d/1wz29qFmSVUoUpcxZzwPgyamrfXTjN8cnqydPW8N6XAg/edit?usp=sharing)
// so there's no authentication. However, Sam provides some [detail](https://github.com/samcday/node-google-spreadsheets#authentication)
// on dealing with authentication should you want to add that. The function expects the required variable `key`,
// which is the Google Spreadsheet ID. In our case, it's '1wz29qFmSVUoUpcxZzwPgyamrfXTjN8cnqydPW8N6XAg'.
// You can get the ID from the Google Sheet's URL - it's the bit after 'https://docs.google.com/spreadsheets/d/'
// and before '/edit#gid=0'. Then we tell it to grab the values from all cells in the first worksheet in the
// range, R1C1:R21C10, or Row 1, Column 1 to Row 21, Column 10 with the function `spreadsheet.worksheets[0].cells()`. In the [example spreadsheet](https://docs.google.com/spreadsheets/d/1wz29qFmSVUoUpcxZzwPgyamrfXTjN8cnqydPW8N6XAg/edit?usp=sharing), that's the whole area populated with data. We save that data in `result.cells` to the variable `charts`, which we later `send` to the route '/charts' using Express, as follows: ` app.get("/charts", function (request, response) { response.send(charts); }); `
//
// The next step is to create charts from the data passed to '/charts'. This happens in the `public/client.js` file.
//
GoogleSpreadsheets({
    key: "1wz29qFmSVUoUpcxZzwPgyamrfXTjN8cnqydPW8N6XAg"
}, function(err, spreadsheet) {
    spreadsheet.worksheets[0].cells({
        // grab all the data
        range: "R1C1:R21C10"
    }, function(err, result) {
    	// Put in-memory store for now
      charts = result.cells;
    });
});

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/charts", function (request, response) {
  response.send(charts);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
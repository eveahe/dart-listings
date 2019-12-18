// init project
const express = require("express");
const app = express();
const GoogleSpreadsheets = require("google-spreadsheets");
const { toXML } = require("jstoxml");

let events;
let berlinEvents;
let rssItems = {};
let rssJSON;
let contentTemplate;

//The first part of the rssFeed
contentTemplate = [
  {
    title: "DART.FYI"
  },
  {
    description:
      "Upcoming NYC events at the intersection of data, technology and art."
  },
  {
    link: "https://dart.fyi"
  },
  {
    lastBuildDate: () => new Date()
  },
  {
    pubDate: () => new Date()
  },
  {
    language: "en"
  }
];

//Loading data from Google Sheet.
//The Google Sheet has to be published to the web for this to work.
//Note that the below is hardcoded to assume that NYC events are in the first worksheet, and Berlin events are in the second.
function checkGS() {
  GoogleSpreadsheets(
    {
      key: process.env.GOOGLE_KEY
    },
    function(err, spreadsheet) {
      spreadsheet.worksheets[0].rows({ offset: 1 }, function(err, result) {
        events = result.map(el => ({
          date: el.date,
          name: el.name,
          locale: el.locale,
          description: el.description,
          link: el.link
        }));
        rssItems = result.filter(function(el) {
            let todayDate = new Date();
            todayDate.setHours(23);
            todayDate.setMinutes(59);
            return new Date(el.date) >= todayDate;
            //Date thing still doesn't properly check today's date.
          }).map(el => ({
            item: {
              title: el.name,
              link: el.link,
              description: el.description,
              pubDate: el.date
            }
        })); 
        for (let i = 0; i < rssItems.length; i++) {
          contentTemplate.push(rssItems[i]);
        }
        rssItems = {} // resetting to zero so it won't endlessly append.
      });
      spreadsheet.worksheets[1].cells({}, function(err, result) {
        berlinEvents = result.cells;
      });
    }
  );
}

checkGS();

//This should then check the API once a minute to see if there's newly entered events.
setInterval(checkGS, 60000);

const xmlOptions = {
  header: false,
  indent: "  "
};

rssJSON =  {
    _name: "rss",
    _attrs: {
      version: "2.0"
    },
    _content: {
      channel: contentTemplate
    }
}


app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/berlin", function(request, response) {
  response.sendFile(__dirname + "/views/berlin.html");
});

app.get("/events", function(request, response) {
  response.send(events);
});

app.get("/berlinevents", function(request, response) {
  response.send(berlinEvents);
});

app.get("/rss", function(request, response) {
  response.set("Content-Type", "text/xml");
  response.send(toXML(rssJSON, xmlOptions));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

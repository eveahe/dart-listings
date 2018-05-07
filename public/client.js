

var dartEvent = "";
var dartDate = "";
var dartName = "";
var dartLocale = "";
var dartDescription = "";
var dartLink = "";
var formattedDate = "";
var currentTime = new Date();

//Writing an event date only if it is in the future
function checkDates(dartDate){
  if(dartDate != "Date"){
    formattedDate = new Date(dartDate);
    if(formattedDate > currentTime){
    return true;
  }}}

//Writing all Event Data...currently though it's just writing event dates... 
function writeEventsData(){
  $.getJSON('/events', function(data){
    $.each(data, function(key,value){
      //Write Event Date!!
      dartDate = value[1].value;
      if(checkDates(dartDate)){
        $("#testDate").append("<li>" + dartDate + "</li>")
        
      //Write Event Name!! 
      dartName = value[2].value;
      $("#testName").append("<li>" + dartName + "</li>")
        
      //Write Event Locale!! 
      dartLocale = value[3].value;
      $("#testLocale").append("<li>" + dartLocale + "</li>")
        
        //This is commented out until I figure out how to handle nulls.
//       //Write Event Description!! 
//       dartDescription = value[4].value;
//       $("#testDescription").append("<li>" + dartDescription + "</li>")
        
      //Write Event Link!! 
      dartLink = value[5].value;
      console.log(dartLink);
      $("#testLink").append('<li><a href="https://'+ dartLink + '">' + dartLink + '</a></li>')
      }//End CheckDates
    })})}

writeEventsData();

/* To Do 
- Understand how laggy this is, and what the lag is exactly!! Seems to be slow to update from GSheets.
- Need to validate whether the links have https in them or not!
*/
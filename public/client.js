

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
        $("#eventdetails").append("<p>" + dartDate + "</p>").addClass("testDateFormat");
        
      //Write Event Name!! 
      dartName = value[2].value;
      $("#eventdetails").append("<br>" + dartName);
      
        
      //Write Event Locale!! 
      dartLocale = value[3].value;
      $("#eventdetails").append("<br>" + dartLocale);
        
        //This is commented out until I figure out how to handle nulls.
      //Write Event Description!! 
      dartDescription = value[4].value;
      $("#eventdetails").append("<br>" + dartDescription);
        
      //Write Event Link!! 
      dartLink = value[5].value;
      console.log(dartLink);
      $("#eventdetails").append('<br><a href="https://'+ dartLink + '">' + dartLink + '</a><br><br>');
      }//End CheckDates
    })})}

writeEventsData();

/* To Do 
- Understand how laggy this is, and what the lag is exactly!! Seems to be slow to update from GSheets.
- Need to validate whether the links have https in them or not!
- Figure out how to handle null cells!
- Do I want to do an order by for dates in the google spreadsheet, or in the application?
- Figure out how to select and stylize components of the event details, maybe through a json add class situation??
- Fix the spaces with <p> paragraph breaks rather than <br>
*/
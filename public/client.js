var dartEvent = "";
var dartDate = "";
var dartName = "";
var dartLocale = "";
var dartDescription = "";
var dartLink = "";
var formattedDate = "";
var counter = 0;
var currentTime = new Date();

//Writing an event date only if it is in the future
function checkDates(dartDate){
  if(dartDate != "Date"){
    formattedDate = new Date(dartDate);
    if(formattedDate > currentTime){
    return true;
  }}}

//Writing all Event Data.
//This starts with dates because if the event was in the past it doesn't write it.
function writeEventsData(){
  $.getJSON('/events', function(data){
    $.each(data, function(key,value){
      //Write Event Date!!
      dartDate = value[1].value;
      if(checkDates(dartDate)){
      //Write Event Dates!!
      $("#eventDetails").append("<div class='eventDate'>" + dartDate + "</div>");
        
      //Set Event Name!! 
      //The event name is now included in the event link. 
      dartName = value[2].value;
     
      //Write Event Link!!
      //Note that item 4 is skipped because it's the description.
      dartLink = value[5].value;
      $("#eventDetails").append("<div class='eventLink eventName'><a href='" + dartLink + "'>" + dartName + "</a></div>");
       
      //Write Event Locale!! 
      dartLocale = value[3].value;
      $("#eventDetails").append("<div class='eventLocale'>" + dartLocale + "</div>");
        

      }//End CheckDates
    })})}


writeEventsData();


/* To Do 
- Figure out how to handle null cells!
- Do I want to do an order by for dates in the google spreadsheet, or in the application?
*/
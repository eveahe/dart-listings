

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

//Writing all Event Data...currently though it's just writing event dates... 
function writeEventsData(){
  $.getJSON('/events', function(data){
    $.each(data, function(key,value){
      //Write Event Date!!
      dartDate = value[1].value;
      if(checkDates(dartDate)){
      //Write Event Dates!!
      $("#eventDetails").append("<div class='eventDate'>" + dartDate + "</div>");
        
      //Write Event Name!! 
      dartName = value[2].value;
      $("#eventDetails").append("<div class='eventName'>" + dartName + "</div>");
       
      //Write Event Locale!! 
      dartLocale = value[3].value;
      $("#eventDetails").append("<div class='eventLocale'>" + dartLocale + "</div>");
        
        //This is commented out until I figure out how to handle nulls.
      //Write Event Description!! 
      dartDescription = value[4].value;
      $("#eventDetails").append("<div class='eventDescription'>" + dartDescription + "</div>");
        
      //Write Event Link!! 
      dartLink = value[5].value;
      $("#eventDetails").append('<div class="eventLink"><a href=' + dartLink + '> link</a></div>');
      }//End CheckDates
    })})}



function reset(){
  $("#eventDetails").empty();
  $("#testName").empty();
}

$("#reloadEvents").on("click", function(){
  reset();
  writeEventsData();
})

/* To Do 
- Understand how laggy this is, and what the lag is exactly!! Seems to be slow to update from GSheets.
- Try to figure out how to get rid of the underline on links
- Figure out how to handle null cells!
- Do I want to do an order by for dates in the google spreadsheet, or in the application?
- Figure out how to select and stylize components of the event details, maybe through a json add class situation??
- Fix the spaces with <p> paragraph breaks rather than <br>
*/
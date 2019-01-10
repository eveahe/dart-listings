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
      dartLink = value[5].value;
      $("#eventDetails").append("<div class='eventLink eventName'><a href='" + dartLink + "'>" + dartName + "</a></div>");
       
      //Set Event Descrip
      dartDescription = value[4].value;
      $("#eventDetails").append("<div class='eventDescription'>" + dartDescription + "</div>");  
          
        
      //Write Event Locale!! 
      dartLocale = value[3].value;
      $("#eventDetails").append("<div class='eventLocale'>" + dartLocale + "</div>");
        

      }//End CheckDates
    })})}

function writeBerlinEventsData(){
      $.getJSON('/berlinevents', function(data){
        $.each(data, function(key,value){
          //Write Event Date!!
          dartDate = value[1].value;
          if(checkDates(dartDate)){
          //Write Event Dates!!
          $("#berlinEventDetails").append("<div class='eventDate'>" + dartDate + "</div>");
            
          //Set Event Name!! 
          //The event name is now included in the event link. 
          dartName = value[2].value;
        
          //Write Event Link!!
          dartLink = value[5].value;
          $("#berlinEventDetails").append("<div class='eventLink eventName'><a href='" + dartLink + "'>" + dartName + "</a></div>");
           
          //Set Event Description
          dartDescription = value[4].value;
          $("#berlinEventDetails").append("<div class='eventDescription'>" + dartDescription + "</div>");  
              
            
          //Write Event Locale!! 
          dartLocale = value[3].value;
          $("#berlinEventDetails").append("<div class='eventLocale'>" + dartLocale + "</div>");
            
    
          }//End CheckDates
        })})}


writeEventsData();

writeBerlinEventsData();


/* To Do 
- Figure out how to handle null cells!
- Do I want to do an order by for dates in the google spreadsheet, or in the application?
*/
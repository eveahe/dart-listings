//Writing an event date only if it is in the future
function checkDates(dartDate){
  if(dartDate != "Date"){
    let formattedDate = new Date(dartDate);
    formattedDate.setHours(23);
    formattedDate.setMinutes(59);
    let currentTime = new Date();
    if(formattedDate > currentTime){
    return true;
  }
  }}

//Writing all Event Data.
//This starts with dates because if the event was in the past it doesn't write it.
function writeEventsData(endpoint){
  $.getJSON(endpoint, function(data){
    $.each(data, function(key,value){
      let dartDate = value.date;
      if(checkDates(dartDate)){
      $("#eventDetails").append("<div class='eventDate'>" + dartDate + "</div>");
        
      //Set Event Name!! 
      let dartName = value.name;
    
      //Set Event Link!!
      let dartLink = value.link;
      $("#eventDetails").append("<div class='eventLink eventName'><a href='" + dartLink + "'>" + dartName + "</a></div>");
       
      //Set Event Description!!
      let dartDescription = value.description;
      $("#eventDetails").append("<div class='eventDescription'>" + dartDescription + "</div>");  
        
      //Write Event Locale!! 
      let dartLocale = value.locale;
      $("#eventDetails").append("<div class='eventLocale'>" + dartLocale + "</div></div>");

      }//End CheckDates
    })})}


writeEventsData('/events');

writeEventsData('/berlinevents');
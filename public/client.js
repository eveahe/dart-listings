

var dartEvent = "";
var dartDate = "";
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
      dartDate = value[1].value;
      if(checkDates(dartDate)){
        $("#testDate").append("<li>" + dartDate + "</li>")
      }
    })})}

writeEventsData();
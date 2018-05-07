

var dartEvent = "";
var dartDate = "";

function checkDates(dartDate){
  if(dartDate != "Date"){
    Date(dartDate);
  }
}

function writeEventsData(){
  $.getJSON('/events', function(data){
    $.each(data, function(key,value){
      dartDate = value[1].value;
      $("#testDate").append("<li>" + dartDate + "</li>")
    })})}

writeEventsData();
var dartEvent = "";

var dartDate = "";

function checkDates(dartDate){
  if(dartDate != "Date"){
    //moment.format(dartDate)
  }
}

function writeEventsData(){
  $.getJSON('/events', function(data){
    $.each(data, function(key,value){
      console.log(data["1"]);
      // dartDate = value[1].value;
      // $("#testDate").append("<li>" + dartDate + "</li>")
    })})}

writeEventsData();
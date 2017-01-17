//
// Step 2: Creating Charts from the Data
// We're using jQuery's `get()`, which loads data from the server using a HTTP GET request. Now, we're also using
// the jQuery plugin, [Gridster](http://gridster.net/), that allows building intuitive draggable layouts from elements
// spanning multiple columns and provides an API. In gridster() we specify that each chart container in our grid will
// have a 5px margin, specified with the option `widget_margins` and setting the container size to be 255x155 with 
// `widget_base_dimensions`. There are many other options though, see their [documentation](http://gridster.net/#documentation)
// for more detail. This is put into the `section` element with `id` 'charts' in our `index.html` file. We're
// using [Google Charts](https://developers.google.com/chart/) to visualize the data we've retrieved from the Google Sheet.
// You can create a chart image with just values in a URL, which you treat like any normal image, displaying it using a
// standard HTML `img` element. So, for the rest of `client.js`, we're just processing the data we got from '/charts'.
// This is done by looping through the data, row by row. Then for each column we get the value the cell contained and
// add it to our `String` variable, `dataStr`. Ultimately, we construct the URL of the Google Chart using the string
// of extracted values. `rarray` values 0 and 1 contain the data from columns A and B of our Google Sheet, in which
// we specify the Google Chart type and the title we're giving our chart. Finally, we put the `img` HTML into the
// Gridster `add_widget` method. So what we end up populating `<section id="charts">` with is a grid of `span` elements,
// which are the chart containers that each has an `img` inside that has all of the data specified in its URL.
//
// The last stage is to display the dashboard, see `views/index.html`.
//
$(function() {
  $.get('/charts', function(charts) {
    var dataStr="";
    var imgStr="";
    var gridster = $("section#charts").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [255, 155]
    }).data('gridster');
    var carray = $.map(charts, function(value, index) {
      return [value];
    });
    
    // loop through each row
    for(var i=1; i<carray.length; i++){
      var rarray = $.map(carray[i], function(value, index) {
        return [value];
      });
      
      // loop through each column
      // columns 1 and 2 are skipped - they have meta data, not chart data
      for(var j=2; j<rarray.length; j++){
        // store the values in a string
        dataStr+=rarray[j].value;
        if(rarray[j+1]) // append comma to all but last value
          dataStr+=",";
      }
    
      // generate the Google Charts URL
      imgStr='<img src="//chart.googleapis.com/chart?cht='+rarray[0].value+'&chtt='+rarray[1].value+'&chs=250x150&chd=t:'+dataStr+'&chxt=x,y&chxs=0,c0c0c0,10,0,lt|1,c0c0c0,10,1,lt&chco=000000" />';
      // Add them to the page using gridster api
      gridster.add_widget('<span id="chart'+i+'">'+imgStr+'</span>', 1, 1);
      dataStr=""; // clear the data string for next loop
    }
  });
});
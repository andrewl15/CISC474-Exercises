$( document ).ready(function() {
    console.log( "ready!" );
    });

$( "button.continue" ).html( "Next Step..." )

var hiddenBox = $( "#banner-message" );
$( "#button-container button" ).on( "click", function( event ) {
  hiddenBox.show();
});

$.ajax({
    url: "http://localhost:8080/index.html?#",
    data: {
      zipcode: 97201
    },
    success: function( result ) {
      $( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
    }
  });
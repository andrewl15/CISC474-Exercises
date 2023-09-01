$( document ).ready(function() {
    console.log( "ready!" );
    });

$(document).ready(function() {
  $('#nameform').submit(function(event) {
    event.preventDefault();

    var firstName = $('#fname').val();
    var lastName = $('#lname').val();

    $('#jumbotron').html('BOOM COIDING, your name is: ' + firstName + ' ' + lastName);
  });
});

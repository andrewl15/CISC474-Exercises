$( document ).ready(function() {
    console.log( "ready!" );

    $('#nameform').submit(function(event) {
      event.preventDefault();
  
      var firstName = $('#fname').val();
      var lastName = $('#lname').val();
  
      $('#jumbotron').html(firstName + ' ' + lastName).css("text-transform","uppercase").css("font-weight","Bold",);
    });
    });

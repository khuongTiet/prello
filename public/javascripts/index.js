$(function() {
  $('#log-out').on('click', function(e) {
    $.ajax({
      url: 'http://localhost:3000/logout',
      type: 'GET',
      dataType: 'json'
    });
  });
});

$("#board-adder-button").on('click', function(e) {
  console.log($(e.target));
  $("#board-adder").toggle();
  $("#add-board-title").focus();
});

$("#board-adder .cancel-button").on('click', function(e) {
  $("#board-adder").toggle();
});



function deleteBoard(e, bid) {
  $.ajax({
    url: `http://localhost:3000/board/${bid}/`,
    method: 'DELETE',
    dataType: 'json'
  }).done(function(){
    $(e.target).parent().remove();
  });
}

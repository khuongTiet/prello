$(function() {

});

$("#board-adder-button").on('click', function(e) {
  console.log($(e.target));
  $("#board-adder").toggle();
  $("#add-board-title").focus();
});

$(".cancel-button").on('click', function(e) {
  $("#board-adder").toggle();
});

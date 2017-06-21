var main_menu = document.querySelector('#optionbar');
var side_menu = document.querySelector('#sidebar');
var menu = document.querySelector('#main-menu');
var cards = document.querySelectorAll('#cards li');
var modal = document.querySelector('#modal');
var card = document.querySelector('#card');

for (var i = 0; i < card.length; i++) {
  cards[i].addEventListener('click', function() {
    card.style.display = 'block';
  });
}

main_menu.addEventListener("click", function() {
  if (menu.style.display === 'none') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
});

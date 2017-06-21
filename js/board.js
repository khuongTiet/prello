var main_menu = document.querySelector('#optionbar');
var side_menu = document.querySelector('#sidebar');
var menu = document.querySelector('#main-menu');
var cards = document.querySelectorAll('#cards li');
var modal = document.querySelector('#modal');
var bg = document.querySelector('#bg');
var card = document.querySelector('#card');

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', function() {
    if (card.style.display === 'none') {
      card.style.display = 'block';
      modal.style.display = 'block';
    } else {
      card.style.display = 'none';
      modal.style.display = 'none';
    }
  });
}

main_menu.addEventListener("click", function() {
  if (menu.style.display === 'none') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
});

bg.addEventListener("click", function() {
  if (modal.style.display === 'block' && card.style.display === 'block') {
    modal.style.display = 'none';
    card.style.display = 'none';
  }
});

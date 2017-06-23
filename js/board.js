var main_menu = document.querySelector('#optionbar');
var side_menu = document.querySelector('#sidebar');
var menu = document.querySelector('#main-menu');
var cards = document.querySelectorAll('.cards li');
var lists = document.querySelector('.lists');
var modal = document.querySelector('#modal');
var bg = document.querySelector('#bg');
var card = document.querySelector('.individual-card');
var cardz = document.querySelector('.cards');
var list_adder_button = document.querySelector('.list-adder-button');
var list_adder = document.querySelector('.list-adder');
var card_adder_button = document.querySelector('.card-adder-button');
var card_adder = document.querySelector('.card-adder');

console.log(document.querySelector('.cards'));

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

cardz.addEventListener('click', function() {

})

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
    list_adder.style.display = 'none';
  }
});

list_adder_button.addEventListener('click', function() {
  if (list_adder.style.display === 'none') {
    list_adder.style.display = 'inline-block';
  } else {
    list_adder.style.display = 'none';
  }
});


function addList() {
  var new_list_name = document.querySelector('#new-list-name');
  if (new_list_name.value.length > 0 ) {
    var newList = document.createElement("LI");
    newList.innerHTML = '<div class="indv-list">' + new_list_name.value + '</div><div class="cardAdder">Add a card...</div>';
    lists.insertBefore(newList, document.querySelector('#list-adder-container'));
    closeAddList();
  }
}

function closeAddList() {
  document.querySelector('#new-list-name').value = '';
  list_adder.style.display = 'none';
}

card_adder_button.addEventListener('click', function() {
  if (card_adder.style.display === 'none') {
    card_adder.style.display = 'block';
  } else {
    card_adder.style.display = 'none';
  }
});

function addCard() {
  var new_card_name = document.querySelector('.add-card-name');
  if (new_card_name.value.length > 0) {
    var newCard = document.createElement("LI");
    
  }
}

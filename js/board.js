var main_menu = document.querySelector('#optionbar');
var sidebar_button = document.querySelector('.sidebar-button');
var sidebar = document.querySelector('.sidebar');
var menu = document.querySelector('#main-menu');
var cards = document.querySelectorAll('.cards li');
var lists = document.querySelector('.lists');
var modal = document.querySelector('#modal');
var bg = document.querySelector('#bg');
var card = document.querySelector('.card');
var cardz = document.querySelector('.cards');
var list_adder_button = document.querySelector('.list-adder-button');
var list_adder = document.querySelector('.list-adder');
var card_adder_buttons = document.querySelectorAll('.card-adder-button');
var card_adders = document.querySelectorAll('.card-adder');
var all_cards = document.querySelectorAll('.cards');

function addList() {
  var new_list_name = document.querySelector('#new-list-name');
  if (new_list_name.value.length > 0 ) {
    var newList = document.createElement("LI");
    newList.innerHTML = '<div class="indv-list">' + new_list_name.value + '</div><div class="card-adder-container">\
    <div class="card-adder-button">\
        Add a card...\
      </div>\
      <div class="card-adder" style="display: none">\
        <textarea rows="3" col="50" class="add-card-name"></textarea>\
        <input type="button" value="Add" class="add-button">\
        <input type="button" class="cancel-button" value="&#10005";>\
        <input type="button" class="option-button" value="&hellip;">\
        </div></div>';
    lists.insertBefore(newList, document.querySelector('#list-adder-container'));
    closeAddList();
  }
}

function closeAddList() {
  document.querySelector('#new-list-name').value = '';
  list_adder.style.display = 'none';
}


$(function() {



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


  sidebar_button.addEventListener('click', function() {
    if (sidebar.style.display === 'none') {
      sidebar.style.display = 'block';
    } else {
      sidebar.style.display = 'none';
    }
  });

});

$('.lists').on('click', '.card-adder-button', function(e) {
  console.log($(e.target).next()[0]);
  if ($(e.target).next()[0].style.display === 'none') {
    $(e.target).next()[0].style.display = 'block';
  } else {
    $(e.target).next()[0].style.display = 'none';
  }
});

function closeAddCard(e) {
  $(e.target).siblings('.add-card-name')[0].value = '';
  $(e.target).parent()[0].style.display = 'none';
}

$('.card-adder').on('click', '.cancel-button', function(e) {
  closeAddCard(e);
});

// go up one more level
$('.card-adder').on('click', '.add-button', function(e) {
  var new_card_name = $(e.target).siblings('.add-card-name')[0];
  var container = $(this).parent().parent().siblings('.cards')[0];
  console.log(new_card_name);
  if (new_card_name.value.length > 0) {
    var newCard = document.createElement("LI");
    newCard.setAttribute("class", "listed-card");
    newCard.innerHTML = new_card_name.value;
    if (container.children.length > 0) {
      container.insertBefore(newCard, container.children[-1]);
    } else {
      container.append(newCard);
    }

  }
  closeAddCard(e);
})


$('.lists').on('click', '.cards li', function(e) {
  var card = $(e.target).children(".card")[0];
  if (card.style.display === 'none') {
    card.style.display = 'block';
    modal.style.display = 'block';
  } else {
    card.style.display = 'none';
    modal.style.display = 'none';
  }
});

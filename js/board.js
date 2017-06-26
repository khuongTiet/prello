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

var cardList = {
  0 : {
    "name" : "List 1",
    "added" : false,
    "cards" : {
      0 : {"name" : "Example Card"},
      1 : {"name" : "Test Card"},
      2 : {"name" : "Dummy Card"}
    }
  },
  1 : {
    "name" : "List 2",
    "added" : false,
    "cards" : {
      0 : {"name" : "Card3"},
      1 : {"name" : "Delete Me"}
    }
  },
  2 : {
    "name" : "List 3",
    "added" : false,
    "cards" : {}
  }
};

var boardCards = [
  {
    "_id" : 0,
    "title" : "List 1",
    "key" : "developer",
    "listed" : false,
    "cards" : [
      {"_id" : 0, "description" : "Example Card"},
      {"_id" : 1, "description" : "Test Card"},
      {"_id" : 2, "description" : "Dummy Card"}
    ]
  },
  {
    "_id" : 1,
    "title" : "List 2",
    "key" : "kt35",
    "listed" : false,
    "cards" : [
      {"_id" : 0, "description" : "Card3"},
      {"_id" : 1, "description" : "Delete Me"}
    ]
  },
  {
    "_id" : 2,
    "title" : "List 3",
    "key" : "developer",
    "listed" : false,
    "cards" : []
  }
]

console.log(cardList[0]);

function populateBoard(boardCards) {
  console.log(boardCards);
  var currentList = $('.lists');
  var listCounter = 0;
  currentList.attr('data-numberoflists', boardCards.length);
  for (indvList of boardCards) {
    if (!indvList.added) {
      $('<li><div class="indv-list">'
        + indvList.title + '<input type="button" class="cancel-button" value="&#10005;"> </div><ul class="cards" data-numCards="'
        + indvList.cards.length +'">\
        <div class="card-adder-container" id="card-adder-' + listCounter + '"><div class="card-adder-button">Add a card...\
          </div><div class="card-adder" id="adder1" style="display: none">\
            <textarea rows="3" col="50" class="add-card-name"></textarea>\
            <input type="button" value="Add" class="add-button">\
            <input type="button" class="cancel-button" value="&#10005;">\
            <input type="button" class="option-button" value="&hellip;">\
          </div></div></ul>').insertBefore($('#list-adder-container'));
      indvList.added = true;
      var cardCounter = 0;
      for (c of indvList.cards) {
        console.log(c);
        $('<li class="listed-card">'
          + c.description + '\
          <div class="card" data-name="Example Card" data-cardid="1" style="display: none">\
            <ul class="individual-card"><div class="card-name">name</div>\
              <div class="card-information">\
                <li class="card-members">members</li>\
                <li class="card-labels">tags</li>\
                <li class="card-desc">description</li>\
                <li class="card-comment">comments</li>\
                <li class="card-activity">activity</li>\
              </div><div class="card-operators">\
                <div class="card-adds">\
                  <li>Add member</li>\
                  <li>Add label</li>\
                  <li>Add checklist</li>\
                  <li>Add due date</li>\
                  <li>Add attachment</li>\
                </div>\
                <div class="card-actions">\
                  <li>Move</li>\
                  <li>Copy</li>\
                  <li>Subscribe</li>\
                  <li>Archive</li>\
                </div></div></ul></div>').insertBefore($('#card-adder-' + listCounter));
      }
    }
    listCounter++;
  }
}

function addList() {
  var new_list_name = document.querySelector('#new-list-name');
  if (new_list_name.value.length > 0 ) {
    cardList[$('.lists')[0].dataset.numberoflists += 1] = {"name" : new_list_name.value, "added" : false, "cards" : {}};
    populateCards(cardList);
    closeAddList();
  }
}

function closeAddList() {
  document.querySelector('#new-list-name').value = '';
  list_adder.style.display = 'none';
}

function getData() {

}


$(function() {

  $.ajax({
    url : "http://thiman.me:1337/kt35/list",
    type : "GET",
    dataType : "json",
  }).done(populateBoard(json));

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

$('.lists').on('click', '.cards .card-adder .cancel-button', function(e) {
  closeAddCard(e);
});

// go up one more level
$('.lists').on('click', '.cards .card-adder .add-button', function(e) {
  console.log($(this).parent().parent().siblings());
  var new_card_name = $(e.target).siblings('.add-card-name')[0];
  var container = $(this).parent().parent().siblings();
  if (new_card_name.value.length > 0) {
    var newCard = document.createElement("LI");
    newCard.setAttribute("class", "listed-card");
    newCard.innerHTML = new_card_name.value;
    if (container.parent().children.length > 0) {
      container.insertBefore(newCard, container[-1]);
      console.log($(this).parent().parent().siblings());
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

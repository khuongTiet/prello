var boardList;
var display = new Set();


// Use if no  internet connection
var fail = [
  {
      "_id": "5951452ad2b587532a2f4812",
      "title": "First List",
      "key": "kt35",
      "cards": [
          {
              "description": "Example Card",
              "_id": "59514627d2b587532a2f4826"
          },
          {
              "description": "Test Card",
              "_id": "59514633d2b587532a2f4828"
          },
          {
              "description": "Dummy Card",
              "_id": "59514640d2b587532a2f4829"
          }
      ]
  },
  {
      "_id": "595162f0fa8c1e6457084142",
      "title": "Last List",
      "key": "kt35",
      "cards": [
          {
              "description": "Final Card",
              "_id": "59516363fa8c1e6457084146"
          }
      ]
  },
  {
      "_id": "59516265fa8c1e6457084139",
      "title": "Middle List",
      "key": "kt35",
      "cards": [
          {
              "description": "Delete Me",
              "_id": "595162d5fa8c1e645708413f"
          },
          {
              "description": "Haha",
              "_id": "595162e2fa8c1e6457084141"
          }
      ]
  }
];

function populateBoard(boardCards) {
  var listCounter = 0;
  var boardHTML = '';
  $('.lists').attr('data-numberoflists', boardCards.length);
  for (indvList of boardCards) {
    display.add(indvList._id);
    if (display.has(indvList._id)) {
      boardHTML = addList(indvList, listCounter, boardHTML);
    }
    listCounter++;
  }
  $('.lists').html(boardHTML);
  $('.lists').append('\
  <li id="list-adder-container">\
    <div id="list-adder-button">\
      Add a list...\
    </div>\
    <div id="list-adder" style="display: none">\
      <input type="text" placeholder="Add a list..." class="namer-text" id="new-list-name">\
      <input type="button" value="Save" class="add-button" onclick="addNewList()">\
      <input type="button" class="cancel-button" value="&#10005;" onclick="closeAddNewList()">\
    </div>\
  </li>');
}

function createList(listTitle) {
  console.log(listTitle);
  $.ajax({
    url : "http://localhost:3000/list/",
    data : {
      "title" : listTitle,
    },
    type : "POST",
    dataType : "json",
  }).done(function(json) {
    console.log("done");
    populateBoard(boardList);
  });
}

function addList(indvList, listCounter, boardHTML) {
  boardHTML = boardHTML +
  '<li><div class="indv-list">'
    + indvList.title +
    '<input type="button" class="cancel-button" value="&#10005;"> \
    </div><ul class="cards" data-numCards="'
    + indvList.cards.length +'" data-indexlist="' + listCounter +'">';

  var cardCounter = 0;
  for (c of indvList.cards) {
    boardHTML = addCard(c, listCounter, cardCounter, boardHTML);
    cardCounter++;
  }
  boardHTML = boardHTML +
  '<div class="card-adder-container" id="card-adder-' + listCounter + '">\
    <div class="card-adder-button">Add a card...\
      </div><div class="card-adder" id="adder1" style="display: none">\
        <textarea rows="3" col="50" class="add-card-name"></textarea>\
        <input type="button" value="Add" class="add-button">\
        <input type="button" class="cancel-button" value="&#10005;">\
        <input type="button" class="option-button" value="&hellip;">\
      </div>\
    </div></ul>';
  display.add(indvList._id);
  return boardHTML;
}

function addCard(indvCard, listCounter, cardCounter, boardHTML) {
  boardHTML = boardHTML +
  '<li class="listed-card">\
    <ul class="card-labels">\
      <li class="blue-label"></li>\
      <li class="green-label"></li>\
    </ul>'
    + indvCard.description +
    '<input type="button" class="cancel-button" value="&#10005;">\
    <div class="card" data-indexCard="' + cardCounter + '" style="display: none">\
      <ul class="modal-card">\
        <div class="card-name">' + indvCard.description + '</div>\
        <div class="card-information">\
          <li class="card-members">members</li>\
          <li class="card-labels">\
            <ul class="color-label">\
              <li class="blue-label"></li>\
              <li class="green-label"></li>\
            </ul>\
          </li>\
          <li class="card-desc">description</li>\
          <li class="card-comment">comments</li>\
          <li class="card-activity">activity</li>\
        </div>\
        <div class="card-operators">\
          <div class="card-adds">\
            <li>Add member</li>\
            <li class="label-adder-container">\
              Labels\
              <div class="label-adder-button"></div>\
              <div class="label-adder" style="display: none">\
                Labels\
                <ul class="add-labels">\
                  <li class="blue-label"></li>\
                  <li class="green-label"></li>\
                  <li class="red-label"></li>\
                  <li class="yellow-label"></li>\
                  <li class="purple-label"></li>\
                  <li class="add-label-orange"></li>\
                </ul>\
              </div>\
            </li>\
            <li>Add checklist</li>\
            <li>Add due date</li>\
            <li>Add attachment</li>\
          </div>\
          <div class="card-actions">\
            <li>Move</li>\
            <li>Copy</li>\
            <li>Subscribe</li>\
            <li>Archive</li>\
          </div>\
        </div>\
      </ul>\
    </div>\
  </li>';
  return boardHTML;
}

function getBoard() {
  $.ajax({
    url : "http://localhost:3000/list/",
    type : "GET",
    data : {},
    dataType : "json",
  }).done(function(json) {
    boardList = [];
    boardList = json;
    populateBoard(boardList);
  }).fail(function() {
    boardList = fail;
    populateBoard(boardList);
  });
}

function closeAddCard(e) {
  $(e.target).siblings('.add-card-name')[0].value = '';
  $(e.target).parent()[0].style.display = 'none';
}

function addNewList() {
  var new_list_name = $('#new-list-name')[0].value;
  if (new_list_name.length > 0 ) {
    // No connection
    // boardList[$('.lists')[0].dataset.numberoflists] = {"title" : new_list_name, "_id" : 0, "cards" : []};
    // Connection
    createList(new_list_name);
    populateBoard(boardList);
    getBoard();
    closeAddNewList();
  }
}

function addNewCard(listIndex, name) {
  $.ajax({
    url: 'http://localhost:3000/list/' + boardList[listIndex]._id + '/card/',
    type: 'POST',
    data: {
      'description' : name,
    },
    dataType: 'json'
  }).done(function() {
    populateBoard(boardList);
    getBoard();
  });
}

function closeAddNewList() {
  $('#new-list-name')[0].value = '';
  $('#list-adder').toggle();
}

function deleteList(listIndex) {
  $.ajax({
    url: 'http://localhost:3000/list/' + boardList[listIndex]._id,
    type: 'DELETE',
    dataType: 'json',
  }).done(function() {
    console.log('deleted');
    display.delete(boardList.splice(listIndex, 1)._id);
    populateBoard(boardList);
    getBoard();
  });
}

function deleteCard(listIndex, cardIndex) {
  $.ajax({
    url: 'http://localhost:3000/list/' + boardList[listIndex]._id
          + '/card/' + boardList[listIndex].cards[cardIndex]._id,
    type: 'DELETE',
    data: {},
    dataType: 'json',
  }).done(function() {
    boardList[listIndex].cards.splice(cardIndex, 1);
    populateBoard(boardList);
    getBoard();
  });
}


$(function() {
  getBoard();

  $('.lists').on('click', '#list-adder-button', function(e) {
    $(e.target).siblings()[0].style.display = 'block';
  });

  $('.lists').on('click', '.card-adder-button', function(e) {
    $(e.target).next().toggle();
  });

  $('.lists').on('click', '.cards .card-adder .cancel-button', function(e) {
    closeAddCard(e);
  });

  // go up one more level
  $('.lists').on('click', '.cards .card-adder .add-button', function(e) {
    var listIndex = $(this).parents('.cards')[0].dataset.indexlist;
    //var cardIndex = $(this).parents('.cards')[0].dataset.numcards;
    var new_card_name = $(e.target).siblings('.add-card-name')[0].value;
    //boardList[listIndex].cards.push({"description" : new_card_name, "_id" : cardIndex});
    addNewCard(listIndex, new_card_name);
    populateBoard(boardList);
    closeAddCard(e);
  })

  $('.lists').on('click', '.cards .listed-card .cancel-button', function(e) {
    var cardIndex = $(this).siblings('.card')[0].dataset.indexcard;
    var listIndex = $(this).parents('.cards')[0].dataset.indexlist;
    deleteCard(listIndex, cardIndex);
  })


  $('.lists').on('click', '.cards .listed-card ', function(e) {
    // check if the target is a child of the .cards flass
    if ($(e.target).attr('class') !== 'cancel-button' &&
        $(e.target).parents('.modal-card')[0] === undefined) {
      var card = $(e.target).children('.card')[0];
      if (card.style.display === 'none') {
        card.style.display = 'block';
        modal.style.display = 'block';
      } else {
        card.style.display = 'none';
        modal.style.display = 'none';
      }
    }
  });

  $('#modal').on('click', '#bg', function(e) {
    if ($('#modal')[0].style.display === 'block') {
      $('#modal')[0].style.display = 'none';
      for (cardd of $('.card')) {
        if (cardd.style.display !== 'none') {
          cardd.style.display = 'none';
        }
      }
    }
  });

  $('.lists').on('click', '.indv-list .cancel-button', function(e) {
    deleteList($(this).parent().siblings('.cards')[0].dataset.indexlist);
  })


  $('.lists').on('click', '.modal-card .label-adder-container .label-adder-button', function(e) {
    console.log($(e.target).siblings('.label-adder').toggle());
  });

  $('.lists').on('click', '.modal-card .label-adder-container .label-adder', function(e) {
    console.log($(e.target));
    console.log($(e.target).parents('.modal-card').children('.card-information').find('.color-label'));
    var modalLabels = $(e.target).parents('.modal-card').children('.card-information').find('.color-label');
    var newLabel = $(e.target)[0];
    modalLabels.append(newLabel);
  });


});


$('#sidebar-button').on('click', function(e) {
  $('#sidebar').toggle();
})

$('#main-menu-container').on('click', '#main-menu-button', function(e) {
  $('#main-menu').toggle();
});

$('#change-background').on('click', '.change-color', function(e) {
  var newColor = $(e.target).attr('data-color');
  $('body').removeClass();
  $('body').addClass(newColor);
  $('#topnav').removeClass();
  $('#topnav').addClass(newColor);
  $('#list-adder-button').removeClass();
  $('#list-adder-button').addClass(newColor);
});

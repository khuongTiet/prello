var boardList;

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
    boardHTML = addList(indvList, listCounter, boardHTML);
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
    getBoard();
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
  return boardHTML;
}

function addCard(indvCard, listCounter, cardCounter, boardHTML) {
  boardHTML = boardHTML +
  '<li class="listed-card">\
    <ul class="card-labels" style="display: none">\
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
            </ul>\
          </li>\
          <li class="card-desc">description</li>\
          <li class="card-comment"><textarea rows="5" col="80" class="add-card-comment"></textarea></li>\
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

function closeAddNewList() {
  $('#new-list-name')[0].value = '';
  $('#list-adder').toggle();
}

function deleteList(e, bid, lid) {
  $.ajax({
    url: `http://localhost:3000/board/${bid}/list/${lid}/`,
    type: 'DELETE',
    dataType: 'json',
  }).done(function() {
    $(e.target).parent().parent().remove();
  });
}

function deleteCard(e, bid, lid, cid) {
  $.ajax({
    url: `http://localhost:3000/board/${bid}/list/${lid}/card/${cid}/`,
    type: 'DELETE',
    dataType: 'json',
  }).done(function() {
    $(e.target).parent().remove();
  });
}


$(function() {
  //getBoard();

  $('.lists').on('click', '#list-adder-button', function(e) {
    $(e.target).siblings()[0].style.display = 'block';
  });

  $('.lists').on('click', '.card-adder-button', function(e) {
    $(e.target).next().toggle();
  });

  $('.lists').on('click', '.cards .card-adder .cancel-button', function(e) {
    closeAddCard(e);
  });


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

  $('.lists').on('click', '.modal-card .label-adder-container .label-adder-button', function(e) {
    console.log($(e.target).siblings('.label-adder').toggle());
  });

  $('.lists').on('click', '.modal-card .label-adder-container .label-adder', function(e) {
    console.log($(e.target));
    console.log($(e.target).parents('.modal-card').children('.card-information').find('.color-label'));
    var modalLabels = $(e.target).parents('.modal-card').children('.card-information').find('.color-label');
    var listLabels = modalLabels.parents('.card').siblings('.card-labels');
    $(e.target).clone().appendTo(modalLabels);
    listLabels.toggle();
    $(e.target).clone().appendTo(listLabels);

  });

  $('#log-out').on('click', function(e) {
    $.ajax({
      url: 'http://localhost:3000/logout',
      type: 'GET',
      dataType: 'json'
    });
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
var boardList;
var display = new Set();


// Use if no  internet connection
var boardList = [
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
  console.log(boardCards);
  $('.lists').attr('data-numberoflists', boardCards.length);
  for (indvList of boardCards) {
    if (!display.has(indvList._id)) {
      addList(indvList, listCounter);
      var cardCounter = 0;
      for (c of indvList.cards) {
        addCard(c, listCounter);
      }
    }
    listCounter++;
  }
}

function createList(listTitle) {
  $.ajax({
    url : "http://thiman.me:1337/kt35/list/",
    data : {
      "title" : listTitle,
    },
    type : "POST",
    dataType : "json",
  }).done(function(json) {
    addList(json, boardList.length);
  })
}

function addList(indvList, listCounter) {
  $('<li><div class="indv-list">'
    + indvList.title + '<input type="button" class="cancel-button" value="&#10005;"> </div><ul class="cards" data-numCards="'
    + indvList.cards.length +'" data-indexlist="' + listCounter +'">\
    <div class="card-adder-container" id="card-adder-' + listCounter + '"><div class="card-adder-button">Add a card...\
      </div><div class="card-adder" id="adder1" style="display: none">\
        <textarea rows="3" col="50" class="add-card-name"></textarea>\
        <input type="button" value="Add" class="add-button">\
        <input type="button" class="cancel-button" value="&#10005;">\
        <input type="button" class="option-button" value="&hellip;">\
      </div></div></ul>').insertBefore($('#list-adder-container'));
  display.add(indvList._id);
}

function addCard(indvCard, listCounter) {
  $('<li class="listed-card">'
    + c.description + '<input type="button" class="cancel-button" value="&#10005;">\
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

function closeAddCard(e) {
  $(e.target).siblings('.add-card-name')[0].value = '';
  $(e.target).parent()[0].style.display = 'none';
}

function addNewList() {
  var new_list_name = $('#new-list-name')[0].value;
  console.log(new_list_name.length);
  // createList(new_list_name.value);
  if (new_list_name.length > 0 ) {
    boardList[$('.lists')[0].dataset.numberoflists] = {"title" : new_list_name, "_id" : 0, "cards" : []};
    populateBoard(boardList);
    closeAddNewList();
  }
}

function closeAddNewList() {
  $('#new-list-name')[0].value = '';
  $('#list-adder').toggle();
}

function deleteList(listIndex) {
  display.delete(boardList.splice(listIndex, 1)._id);
  console.log(boardList);
  populateBoard(boardList);
}

$(function() {
  // var json = $.ajax({
  //   url : "http://thiman.me:1337/kt35/list",
  //   type : "GET",
  //   data : "{}",
  //   dataType : "json",
  // }).done(function(json) {
  //   boardList = json;
  //   populateBoard(json);
  // }).fail(function() {
  //   populateBoard(noWifi);
  // });



  $('.lists').on('click', '.card-adder-button', function(e) {
    $(e.target).next().toggle();
  });

  $('.lists').on('click', '.cards .card-adder .cancel-button', function(e) {
    closeAddCard(e);
  });

  // go up one more level
  $('.lists').on('click', '.cards .card-adder .add-button', function(e) {
    console.log($(this).parents('.cards')[0]);
    var new_card_name = $(e.target).siblings('.add-card-name')[0];
    var container = $(this).parents('.cards')[0];
    var selectedList = boardList[container.dataset.listid]
    console.log(selectedList.cards);
    selectedList.cards.push({"description" : new_card_name.value, "_id" : selectedList.cards.length})
    populateBoard(boardList);
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
});

$('#list-adder-button').on('click', function(e) {
  $('#list-adder').toggle();
});

$('#sidebar-button').on('click', function(e) {
  $('#sidebar').toggle();
})

$('#main-menu-container').on('click', '#main-menu-button', function(e) {
  $('#main-menu').toggle();
});

$('.lists').on('click', '.indv-list .cancel-button', function(e) {
  deleteList($(this).parent().siblings('.cards')[0].dataset.indexlist);
})

populateBoard(boardList);

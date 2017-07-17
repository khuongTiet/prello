var board = {};

var bid = window.location.pathname.split('/')[2];

var socket = io();

socket.emit('join', {user: $('#current-user').data('user'), roomid: bid});

socket.on('join', function(data) {
  socket.emit('join', data);
});


function closeAddCard(e) {
  $(e.target).siblings('.add-card-name')[0].value = '';
  $(e.target).parents('.card-adder').toggle();
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

function dataSetup(data) {
  $.each(data, function() {
    board[this._id] = this;
    for (var i = 0 ; i < this.cards.length; i++) {
      board[this._id].cards[this.cards[i]._id] = this.cards[i];
    }
  })
}

$(function() {
  var rawJSON;
  $.ajax({
    url: `http://localhost:3000/board/${bid}/list`,
    method: 'GET',
    dataType: 'json'
  }).done(dataSetup);


  $('#list-adder-button').on('click', function(e){
    $('#list-adder').toggle();
  });

  $('.lists').on('click', '.card-adder-button', function(e) {
    $(e.target).next().toggle();
  });

  $('.lists').on('click', '.cards .card-adder .add-button', function(e) {
    socket.emit('newCard');
    var lid = $(e.target).parents('.cards').siblings('.indv-list').data('lid');
    var $name = $(e.target).prev()[0].value;
    addCard(e, lid, $name)
    $(e.target).prev()[0].value = '';
  })

  $('.lists').on('click', '.cards .card-adder .cancel-button', function(e) {
    closeAddCard(e);
  });

  $('#list-adder .add-button').on('click', function(e) {
    var $title = $('#new-list-name')[0].value;
    addList($title);
    $('#new-list-name')[0].value = '';
  });


  $('.lists').on('click', '.cards .listed-card ', function(e) {
    // check if the target is a child of the .cards flass
    if ($(e.target).attr('class') !== 'cancel-button') {
      var card = $(e.target).children('.card')[0];
      var lid = $(e.target).parent().siblings('.indv-list').data('lid');
      var cid = $(e.target).data('cid');
      setModalCard(lid, cid);
      $('#modal-card').toggle();
      $('#modal').toggle();
    }
  });

  $('#modal').on('click', '#bg', function(e) {
    $('#modal').toggle();
    $('#modal-card').toggle();
  });

  $('#label-adder-button').on('click', function(e) {
    $('#label-adder').toggle();
  });

  $('#label-adder').on('click', '#label-choices li', function(e) {
    var $lid = $('#modal-card-name').attr('data-lid');
    var $cid = $('#modal-card-name').attr('data-cid');
    addLabel(e, $lid, $cid);
  });

  $('#card-comment-button').on('click', function(e) {
    var $lid = $('#modal-card-name').attr('data-lid');
    var $cid = $('#modal-card-name').attr('data-cid');
    addComment(e, $lid, $cid);
  })



  function setModalCard(lid, cid) {
    var currentList = board[lid];
    var currentCard = board[lid].cards[cid];
    var $modalName = $('#modal-card-name');
    var $modalLabels = $('#modal-card-labels');
    var $modalComments = $('#modal-card-comments-list')
    $modalName.empty();
    $modalLabels.empty();
    $modalComments.empty();
    $modalName
      .append($('<h2></h2>', {text: currentCard.name}))
      .append($('<h4></h4>', {text: `In List ${board[lid].title}`}));
    $modalName.attr('data-lid', lid);
    $modalName.attr('data-cid', cid);
    for (var i = 0; i < currentCard.labels.length; i++) {
      $modalLabels.append($('<li></li>', {class: currentCard.labels[i]}));
    }
    for (var i =0; i < currentCard.comments.length; i++) {
      $modalComments.append($('<li></li',
      {
        class: 'card-comments',
        text: `${currentCard.comments[i].content} by ${currentCard.comments[i].author}`}));
    }
  }

  function newList(listData) {
    board[listData._id] = {title: listData.title, cards : listData.cards};
    var $newList = $('<li></li>');
    var $indvlist = $('<div></div>', {class: 'indv-list', text: listData.title})
      .append($('<input/>',
        {
          class: 'cancel-button',
          type: 'button',
          value: '✕',
          onclick: `deleteList(event, "${bid}", "${listData._id}")`
        }));
    $indvlist.attr('data-lid', listData._id);
    var $cardList = $('<ul></ul>', {class: 'cards'});
    for (var i = 0; i < board[listData._id].cards; i++) {
      newCard(board[listData._id].cards[i], listData._id).appendTo($cardList);
    }
    var $cardAdder = $('<div></div>', {class: 'card-adder-container'})
      .append($('<div></div>', {class: 'card-adder-button', text: 'Add a card ...'}))
      .append($('<div></div>', {class: 'card-adder', style: 'display: none'})
        .append($('<textarea></textarea>', {row: '3', col: '50', class: 'add-card-name', name: 'name'}))
        .append($('<input/>', {type: 'submit', class: 'add-button'}))
        .append($('<input/>', {type: 'button', class: 'cancel-button', value: '✕'}))
        .append($('<input/>', {type: 'button', class: 'option-button', value: '…'})));
    $indvlist.appendTo($newList);
    $cardAdder.appendTo($cardList);
    $cardList.appendTo($newList);
    $newList.insertBefore('#list-adder-container');
  }


  function addList(title) {
    $.ajax({
      url: `http://localhost:3000/board/${bid}/list`,
      method: 'POST',
      data : {
        'title': title
      },
      dataType: 'json'
    });
  }

  socket.on('newList', function(data) {
    console.log(`${data.user} adding new list`);
    newList(data.list);
  });

  function addCard(e, lid, name) {
    $.ajax({
      url: `http://localhost:3000/board/${bid}/list/${lid}/card`,
      method: 'POST',
      data: {
        'name': name
      },
      dataType: 'json'
    });
  }
  function newCard(card, lid) {
    board[lid].cards[card._id] =
      {
        name: card.name,
        description: card.description,
        labels: card.labels,
        comments: card.comments,
        author: card.author,
        members: card.members
      }
    var $newCard = $('<li></li', {class: 'listed-card'});
    $('<ul></ul>', {class: 'card-labels'}).appendTo($newCard);
    $newCard.append(card.name);
    $newCard.attr('data-cid', card._id);
    $('<input/>', {
      class: 'cancel-button',
      type: 'button',
      value: '✕',
      onclick: `deleteCard(event, "${bid}", "${lid}", "${card._id}")`
    }).appendTo($newCard);
    return $newCard;
  }

  socket.on('newCard', function(data) {
    var $target = $(`[data-lid="${data.lid}"]`);
    var $card = newCard(data.card, data.lid);
    var $cardAdder = $target.siblings().find('.card-adder-container');
    $card.insertBefore($cardAdder);
  });


  function drawLabel(cid, label) {
    var $label = $('<li></li>', {class: label});
    var $target = $(`[data-cid="${cid}"]`);
    var $modal = $('#modal-card-labels');
    var $list = $target.children('.card-labels');
    $label.clone().appendTo($modal);
    $label.clone().appendTo($list);
  }

  function addLabel(e, lid, cid) {
    var newLabel = $(e.target).attr('class');
    $.ajax({
      url: `http://localhost:3000/board/${bid}/list/${lid}/card/${cid}/labels`,
      method: 'POST',
      data: {
        'label': newLabel
      },
      dataType: 'json'
    });
  }


  socket.on('newLabel', function(data) {
    console.log(`${data.author} adding label`);
    drawLabel(data.cid, data.label);
  });

  function addComment(e, lid, cid) {
    var $content = $('#card-comment-text')[0].value;
    $.ajax({
      url: `http://localhost:3000/board/${bid}/list/${lid}/card/${cid}/comments`,
      method: 'POST',
      data: {
        'content': $content,
      },
      dataType: 'json'
    });
  }

  function drawComment(content) {
    console.log(content);
    var $newComment = $('<li></li>', {class: 'card-comments', text: content});
    $('#modal-card-comments-list').append($newComment);
  }

  socket.on('newComment', function(data) {
    console.log(`${data.author} adding new comment`);
    console.log(data);
    drawComment(data.content);
  })
});

function changeColor(e, bid) {
  var $color = $(e.target).attr('data-color');
  $.ajax({
    url: `http://localhost:3000/board/${bid}/color`,
    method: 'PATCH',
    data: {
      color: $color
    },
    dataType: 'json'
  }).done(function() {
    $('body').removeClass();
    $('body').addClass($color);
    $('#topnav').removeClass();
    $('#topnav').addClass($color);
    $('#list-adder-button').removeClass();
    $('#list-adder-button').addClass($color);
  });
}

$('#sidebar-button').on('click', function(e) {
  $('#sidebar').animate({width: "toggle", height: "slide"});
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
  $('#log-out-button').removeClass();
  $('#log-out-button').addClass('add-button');
  $('#log-out-button').addClass(newColor);
});

$('#add-board-member-button').on('click', function(e) {
  $('#add-board-member').toggle();
})

var boardList;
var bid = window.location.pathname.split('/')[2];

var socket = io();

socket.on('connection', function(server) {
  server.on('newList', function(data) {
    server.emit('newList', data);
  })
});

socket.on('join', function(data) {
  socket.emit('join', data);
});

socket.on('newList', function(data) {
  console.log(`${data.author} adding new list`);
  var newDiv = $('<div></div>', {class: 'indv-list', text: data.title });
  var newList = $('<li></li>').append(newDiv);
  var listCards = $('<ul></ul>', {class: 'cards'});
  var cardAdder = $('<div></div>', {class: 'card-adder-container'});
  cardAdder.html(cardAdderHTML);
  listCards.append(cardAdder);
  newList.append(listCards);
  newList.insertBefore('#list-adder-container');
});

socket.on('newLabel', function(data) {
  console.log(`${data.author} adding label`);
  drawLabel(data.cid, data.label);
  socket.emit('newLabel', data);
})




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
  $('.lists').on('click', '#list-adder-button', function(e) {
    $(e.target).siblings()[0].style.display = 'block';
  });

  $('.lists').on('click', '.card-adder-button', function(e) {
    $(e.target).next().toggle();
  });

  $('.lists').on('click', '.cards .card-adder .add-button', function(e) {
    socket.emit('newCard');
  })

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
    $(e.target).siblings('.label-adder').toggle();
  });
});

// function addList(e, bid) {
//   var $title = $(e.target).siblings('#new-list-name').value;
//   $.ajax({
//     url: `http://localhost:3000/board/${bid}`,
//     method: 'POST',
//     data: {
//       title: $title
//     }
//     dataType: 'json'
//   }).done(function() {
//     var $newList;
//   });
// }

var cardAdderHTML = `<div class="card-adder-container">
  <div class="card-adder-button">Add a card...</div>
  <div class="card-adder" style="display: none">
    <form method="POST"%>
      <textarea rows="3" col="50" class="add-card-name" name="name"></textarea>
      <input type="submit" value="Add" class="add-button">
      <input type="button" class="cancel-button" value="&#10005;">
      <input type="button" class="option-button" value="&hellip;">
    </form>
  </div>
</div>`;

var cancelHTML = '<input type="button" class="cancel-button" value="&#10005;"\
 onclick="deleteList(event, <%= `"${boardPage._id}", "${boardPage.lists[i]._id}"` %>)">\
'




function addList(e, title) {
  $.ajax({
    url: `http://localhost:3000/board/${bid}/list`,
    method: 'POST',
    data : {
      'title': $(e.target).siblings('#new-list-name')[0].value
    }
  }).done(function(){
    var newDiv = $('<div></div>', {class: 'indv-list', text: $('#new-list-name')[0].value});
    var listCancel = $('<input/>', {class: 'cancel-button', type: 'button', value: "&#10005;", onclick: 'deleteList(event, <%= `"${boardPage._id}", "${boardPage.lists[i]._id}"` %>)'});
    var newList = $('<li></li>').append(newDiv);
    var listCards = $('<ul></ul>', {class: 'cards'});
    var cardAdder = $('<div></div>', {class: 'card-adder-container'});
    cardAdder.html(cardAdderHTML);
    listCards.append(cardAdder);
    newList.append(listCards);
    newList.append(listCancel);
    newList.insertBefore('#list-adder-container');
  });
}

function addCard(e, name) {
  $.ajax({
    url: `http://localhost:3000/board/${bid}/list/${lid}`,
    method: 'POST',
    data: {
      'name': name
    }
  }).done(function() {
    //draw card
  });
}

function drawLabel(cid, label) {
  console.log(label);
  var $label = $('<li></li>', {class: label});
  var $target = $(`[data-cid="${cid}"]`);
  console.log($target);
  console.log($label);
  var modalLabels = $target.find('.color-label');
  var listLabels = $target.children('.card-labels');
  console.log(listLabels);
  $label.clone().appendTo(modalLabels);
  $label.clone().appendTo(listLabels);
}

function addLabel(e, bid, lid, cid) {
  var newLabel = $(e.target).attr('class');
  $.ajax({
    url: `http://localhost:3000/board/${bid}/list/${lid}/card/${cid}/labels`,
    method: 'POST',
    data: {
      'label': newLabel
    },
    dataType: 'json'
  }).done(function(){
    drawLabel(cid, newLabel);
    socket.emit('newLabel', e);
  });
}

function addComment(e, bid, lid, cid) {
  var $content = $(e.target).siblings('.add-card-name')[0].value;
  var $commentList = $(e.target).parent().siblings('.card-activity').children('.card-comments-list')[0];
  $.ajax({
    url: `http://localhost:3000/board/${bid}/list/${lid}/card/${cid}/comments`,
    method: 'POST',
    data: {
      'content': $content,
    },
    dataType: 'json'
  }).done(function(){
    var $newComment = $('<li></li>', {class: 'card-comments', text: $content});
    $('.cards.comment-list').append($newComment);
    socket.broadcast.emit('newComment');
  });
}

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

$('#add-board-member-button').on('click', function(e) {
  $('#add-board-member').toggle();
})

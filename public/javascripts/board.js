var boardList;
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
});

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
    var modalLabels = $(e.target).parents('.modal-card').children('.card-information').find('.color-label');
    var listLabels = modalLabels.parents('.card').siblings('.card-labels');
    $(e.target).clone().removeAttr('onclick').appendTo(modalLabels);
    $(e.target).clone().removeAttr('onclick').appendTo(listLabels);
    console.log('added');
  });
}

function addComment(e, bid, lid, cid) {
  var $content = $(e.target).siblings('.add-card-name')[0].value;
  var $commentList = $(e.target).parent().siblings('.card-activity').children('.card-comments-list')[0];
  console.log('commenting');
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
    console.log('commented');
  });
}

$('#log-out').on('click', function(e) {
  $.ajax({
    url: 'http://localhost:3000/logout',
    type: 'GET',
    dataType: 'json'
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

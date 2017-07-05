function registerUser(name, email, password) {
  $.ajax({
    url : 'http://localhost:3000/signup/',
    type : 'POST',
    data : {
      'name': name,
      'email': email,
      'password': password
    },
    dataType : 'json',
  }).done(function(json) {
    console.log(json);
  });
}

function loginUser(email, password) {
  $.ajax({
    url : 'http://localhost:3000/login/',
    type : 'POST',
    data : {
      'email': email,
      'password': password
    },
    dataType : 'json',
  }).done(function(json) {
    console.log(json);
  });
}

$(function() {
  $('#submit-btn').on('click', function(e) {
    console.log($(e.target));
    console.log($('#register-password').val());
    if ($('#register-password').val() === $('#register-password-confirm').val()) {
      registerUser($('#register-name').val(), $('#register-email').val(), $('#register-password').val());
    }
  });

  $('#login-btn').on('click', function(e) {
    loginUser($('#login-email').val(), $('#login-password').val());
  })
});
